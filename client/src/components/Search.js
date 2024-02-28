import React from 'react';

function Search({onSearch}) {
    return (
        <div className = 'search'>
            <input className = 'search-bar'
                    type="text"
                    placeholder="Search Recipes or Categories"
                    onChange={onSearch}
            />
        </div>
    )

}

export default Search;