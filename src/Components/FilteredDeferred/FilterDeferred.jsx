import React, { useState, useTransition } from 'react';
import SearchResults from '../SearchResults/SearchResults';

import style from './filterDeferred.module.css';

const FilterDeferred = ({
    filterPersons,
    persons,
    count,
    loading
}) => {
    const [inputValue, setInputValue] = useState('');
    const [isPending, startTransition] = useTransition('');

    const handleChangeInput = (event) => {

        startTransition(() => {
            setInputValue(event.target.value);
        });
    };
    console.log(persons)

    return (
        <div>
             <h1 className={style.header}>FilterDeferred</h1>
             <div className={style.filterContainer}>
                {isPending && <span className={style.loadingList}>Loading List...</span>}

            {loading === count ?
                <div className={style.filterContainer}>
                    <SearchResults filterPersons={filterPersons}
                        value={inputValue}
                        onChange={handleChangeInput} />

                    <ul>
                        {persons?.map((item) => {
                            return <li key={item.name}>{item.name}</li>
                        })}
                    </ul>
                </div> : ' Loading...'}
        </div>
        </div>
    );
}

export default FilterDeferred;
