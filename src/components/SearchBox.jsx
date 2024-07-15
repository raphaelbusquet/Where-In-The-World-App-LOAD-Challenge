import React, { useState } from 'react';

const SearchBox = ({ onSearch, onSelect }) => {
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
        onSearch(event.target.value); // Passa o valor atual do input para o live filtering
    };

    const selectHandler = (event) => {
        const regionName = event.target.value;
        onSelect(regionName);
    };

    return (
        <section className='search__box'>
            <form className='input__text'>
                <input
                    type="text"
                    placeholder='Search for a country...'
                    value={input}
                    onChange={handleInputChange} // Atualiza o valor do input para o trigger onSearch
                />
            </form>
            <div className='region__filter'>
                <select name="select" id="select" className='select' onChange={selectHandler}>
                    <option value="">Filter by region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
        </section>
    );
};

export default SearchBox;
