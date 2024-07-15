import React, { useState, useEffect } from 'react';
import { apiURL } from './utils/api';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import SearchBox from './SearchBox';
import { useDebounce } from './utils/useDebounce'; 

const Main = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchTerm = useDebounce(searchQuery, 500); 

    // Função para buscar todos os países
    const getAllCountries = async () => {
        try {
            const res = await fetch(`${apiURL}/all`);
            if (!res.ok) throw new Error('Something went wrong!');
            const data = await res.json();
            setCountries(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    // Função para buscar países por nome
    const getCountryByName = async (countryName) => {
        setSearchQuery(countryName); // Atualiza o estado do nome do país
        if (countryName.trim() === '') {
            setError(''); // Limpa o erro se o campo de pesquisa estiver vazio
        }
    };

    // Função para buscar países por região
    const getCountryByRegion = async (regionName) => {
        try {
            const res = await fetch(`${apiURL}/region/${regionName}`);
            if (!res.ok) throw new Error('No countries found in that region!');
            const data = await res.json();
            setCountries(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setCountries([]);
            setError(error.message);
        }
    };

    // Efeito para buscar todos os países na renderização inicial
    useEffect(() => {
        getAllCountries();
    }, []);

    // Efeito para lidar com o debounce e filtro de países
    useEffect(() => {
        if (debouncedSearchTerm) {
            const fetchFilteredCountries = async () => {
                try {
                    const res = await fetch(`${apiURL}/name/${debouncedSearchTerm}`);
                    if (!res.ok) throw new Error('No country found with that name!');
                    const data = await res.json();
                    setCountries(data);
                    setIsLoading(false);
                    setError(''); // Limpa o erro ao atualizar os países filtrados com sucesso
                } catch (error) {
                    setIsLoading(false);
                    setCountries([]);
                    setError(error.message);
                }
            };

            fetchFilteredCountries();
        } else {
            getAllCountries(); // Se não houver termo de pesquisa, buscar todos os países
        }
    }, [debouncedSearchTerm]); // Executar sempre que debouncedSearchTerm mudar

    return (
        <div>
            <div>
                <SearchBox onSearch={getCountryByName} onSelect={getCountryByRegion} />
            </div>
            <div className='grid'>
                {isLoading && <h4 className='loader'><SyncLoader /></h4>}
                {error && <h4>{error}</h4>}
                {countries.length === 0 && searchQuery !== '' && !isLoading && !error && <h4>No countries found.</h4>}
                {
                    countries.map((country) => (
                        <Link key={country.name.common} to={`/name/${country.name.common}`} style={{ textDecoration: 'none', color: '#000' }}>
                            <div className='country__card'>
                                <div className='country__img'>
                                    <img src={country.flags.png} alt={country.name.common} />
                                </div>

                                <div className='country__data'>
                                    <h3>{country.name.common}</h3>
                                    <h6>Population: <span>{country.population}</span></h6>
                                    <h6>Region: <span>{country.region}</span></h6>
                                    <h6>Capital: <span>{country.capital}</span></h6>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Main;
