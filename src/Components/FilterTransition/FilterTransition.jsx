import React, { useDeferredValue, useState } from 'react';
import SearchResults from '../SearchResults/SearchResults';

import style from './filterTransition.module.css';

const FilterTransition = ({
    filterPersons,
    persons,
    count,
    loading
}) => {

    const [inputValue, setInputValue] = useState('');
    const defferedPersons = useDeferredValue(persons);

    const handleChangeInput = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <h1 className={style.header}>FilterTransition</h1>
            <div className={style.transitionContainer}>
            {loading === count ?
                <div>
                    <SearchResults filterPersons={filterPersons}
                        value={inputValue}
                        onChange={handleChangeInput} />

                    <ul>
                        {defferedPersons?.map((item) => {
                            return <li key={item.name}>{item.name}</li>
                        })}
                    </ul>
                </div> :
                ' Loading...'}
            </div>
        </div>
    );
}

export default FilterTransition;
