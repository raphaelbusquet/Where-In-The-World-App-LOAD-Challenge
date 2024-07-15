import React, { useEffect, useState } from 'react';
import './CountryInfo.css'
import { useParams, Link } from 'react-router-dom';
import { apiURL } from './utils/api';
import { FaArrowLeftLong } from "react-icons/fa6";
import { SyncLoader } from 'react-spinners';

const CountryInfo = () => {
    const [country, setCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const { countryName } = useParams();

    useEffect(() => {
        const getCountryByName = async () => {
            try {
                const res = await fetch(`${apiURL}/name/${countryName}`);

                if (!res.ok) {
                    throw new Error('Could not fetch country');
                }

                const data = await res.json();

                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Country data not found');
                }

                setCountry(data[0]);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };
        setTimeout(getCountryByName, 1000)
    }, [countryName]);

    return (
        <div className="country__info__wrapper">
            <button className='button'>
                <Link className='button__link' style={{ textDecoration: 'none', color: '#fff' }} to='/'>
                    <FaArrowLeftLong />
                    <div>
                        Back
                    </div>
                </Link>
            </button>

            {isLoading && !error && <h4 className='loader'><SyncLoader /></h4>}
            {error && !isLoading && <h4>{error}</h4>}

            {country && (
                <div className="country__info__container">
                    <div className="country__info-img">
                        <img src={country.flags.png} alt={country.name.common} />
                    </div>

                    <div className="country__info">

                        <div className="country__info-main">
                            <div>
                                <h3>{country.name.common}</h3>
                                <h5>Native Name: <span>{Object.values(country.name.nativeName)[0]?.common}</span></h5>
                                <h5>
                                    Population:{' '}
                                    <span>
                                        {new Intl.NumberFormat().format(country.population)}
                                    </span>
                                </h5>
                                <h5>
                                    Region: <span>{country.region}</span>
                                </h5>
                                <h5>
                                    Sub Region: <span>{country.subregion}</span>
                                </h5>
                                <h5>
                                    Capital: <span>{country.capital}</span>
                                </h5>
                            </div>
                            <div>
                                <div className="country__info-more">
                                    <h5>Top Level Domain: <span>{country.tld}</span></h5>
                                    <h5>Currencies: <span>{Object.values(country.currencies)[0].name}</span></h5>
                                    <h5>Languages: <span>{Object.values(country.languages)[0]}</span></h5>
                                </div>
                            </div>
                        </div>
                        {country.borders && (
                            <div>
                                <h3>Border Countries</h3>
                                <div className='borders'>
                                    {country.borders?.map((border, index) => (
                                        <p key={index}><span>{border}</span></p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountryInfo;
