import React, { memo, useMemo, useState } from 'react';

const SearchResults = ({
    filterPersons,
    value,
    onChange
}) => {

    const search = useMemo(() => {
        filterPersons(value);
    }, [value]);

    return(
        <div>
            <input type="text" 
                   value={value} 
                   onChange={onChange}  />
            
        </div>
    );
}

export default memo(SearchResults);
