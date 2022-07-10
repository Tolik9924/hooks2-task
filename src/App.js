import React, { useReducer } from 'react';
import { useEffect } from 'react';
import './App.css';
import FilterDeferred from './Components/FilteredDeferred/FilterDeferred';
import FilterTransition from './Components/FilterTransition/FilterTransition';

const initialState = {
    data: [],
    personsDeferred: [],
    personsTransition: [],
    loading: 0,
    count: 0,
    error: null
}

function reducer(state, action) {
    switch (action.type) {
        case 'addData': {
            return { ...state, data: action.data };
        }
        case 'addPersonsDeferred': {
            return { ...state, personsDeferred: action.value };
        }
        case 'addPersonsTransition': {
            return { ...state, personsTransition: action.value };
        }
        case 'searchDataDeferred': {
            return {
                ...state,
                personsDeferred: action.payload === '' ? state.data : state.personsDeferred.filter((item) => {
                    console.log(state.personsDeferred)
                    return item.name.toLowerCase().includes(action.payload.toLowerCase());

                })
            };
        }
        case 'searchDataTransition': {
            return {
                ...state,
                personsTransition: action.payload === '' ? state.data : state.personsTransition.filter((item) => {
                    console.log(state.personsTransition)
                    return item.name.toLowerCase().includes(action.payload.toLowerCase());

                })
            };
        }
        case 'loading': {
            return {
                ...state, loading: action.loading
            }
        }
        case 'addCount': {
            return {
                ...state, count: action.count
            }
        }
        case 'getError': {
            return {
                ...state, error: action.error
            }
        }
        default: return state;
    }
}

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const arr = [];
    let page = 1

    useEffect(() => {

        const getEntry = async (page) => {
            try {
                const result = await fetch(`https://swapi.dev/api/people?page=${page}`);
                const body = await result.json();
                if (arr.length < body.count) {
                    arr.push(...body.results);
                    dispatch({ type: 'loading', loading: arr.length });
                    getEntry(page += 1);
                } else {
                    dispatch({ type: 'addData', data: arr })
                    dispatch({ type: 'addPersonsDeferred', value: arr });
                    dispatch({ type: 'addPersonsTransition', value: arr });
                }
            }
            catch (e) {
                dispatch({ type: 'getError', error: e.message })
            }
        }
        getEntry(page);

        const getCount = async () => {
            try {
                const result = await fetch('https://swapi.dev/api/people');
                const body = await result.json();
                dispatch({ type: 'addCount', count: body.count });
            } catch (e) {
                dispatch({ type: 'getError', error: e.message })
            }
        }

        getCount();
    }, []);


    const filterPersonsDeferred = (payload) => {
        return dispatch({ type: 'searchDataDeferred', payload })
    };

    const filterPersonsTransition = (payload) => {
        return dispatch({ type: 'searchDataTransition', payload })
    };

    console.log('personsDeferred', state.personsDeferred);
    console.log('personsTransition', state.personsTransition);

    return (
        <div className="container">
            <div className="loading">
                Loading  {state.loading} / {state.count}
            </div>
            <div className="filterContainer">
                <div className="filterDeferred">
                    <FilterDeferred filterPersons={filterPersonsDeferred}
                        persons={state.personsDeferred}
                        count={state.count}
                        loading={state.loading} />
                </div>
                <div className="filterTransition">
                    <FilterTransition filterPersons={filterPersonsTransition}
                        persons={state.personsTransition}
                        count={state.count}
                        loading={state.loading} />
                </div>
            </div>
        </div>
    );
}

export default App;
