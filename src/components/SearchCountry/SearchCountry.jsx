import React, { useEffect, useState } from 'react';
import fetchCountries from '../../utils/fetchCountries';
import styles from './SearchCountry.module.css';

const SearchCountry = ({ onCountryChange }) => {
    const [countries, setCountries] = useState({});
    const [searchCountry, setSearchCountry] = useState(
        localStorage.getItem('selectedCountry') || '',
    );
    const [showCountryList, setShowCountryList] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesData = await fetchCountries();
                setCountries(countriesData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearchCountry = (e) => {
        setSearchCountry(e.target.value);
        setShowCountryList(true);
    };

    const handleOnClick = () => {
        setShowCountryList(!showCountryList);
    };

    const handleCountrySelect = (countryName) => {
        setSearchCountry(countryName);
        setShowCountryList(false);
        onCountryChange(countryName);
        localStorage.setItem('selectedCountry', countryName);
    };

    const filteredCountries = Object.entries(countries).filter(
        ([countryName]) =>
            countryName.toLowerCase().includes(searchCountry.toLowerCase()),
    );

    return (
        <div
            onClick={() => setShowCountryList(false)}
            className={styles.container}
        >
            <h3>Search your country</h3>
            <div onClick={(e) => e.stopPropagation()}>
                <div className={styles.searchWrapper}>
                    <input
                        placeholder='Search your city'
                        value={searchCountry}
                        onChange={handleSearchCountry}
                        className={styles.input}
                        style={{ height: '30px' }}
                    />
                    <button onClick={handleOnClick} className={styles.btn}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            style={{ height: '30px' }}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5'
                            />
                        </svg>
                    </button>
                </div>
                <ul className={styles.select} size={6}>
                    {filteredCountries.length ? (
                        showCountryList &&
                        filteredCountries.map(([countryName, countryCode]) => (
                            <li
                                key={countryCode}
                                value={countryCode}
                                onClick={() => handleCountrySelect(countryName)}
                            >
                                {countryName}
                            </li>
                        ))
                    ) : (
                        <li>Nothing found</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SearchCountry;
