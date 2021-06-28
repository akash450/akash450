import React from 'react'

const Search = (props) => {
    return (
        <div>
            <input
                className="searchMovie"
                value={props.value}
                onChange = {(e) => props.setSearchVal(e.target.value)}
                placeholder = "Search the best movies...">
            </input>
        </div>
    );
};

export default Search
