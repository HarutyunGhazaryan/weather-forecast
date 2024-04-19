import React, { useState } from 'react';
import SearchCountry from '../components/SearchCountry/SearchCountry';
import CurrentData from '../components/CurrentData/CurrentData';

const Weather = () => {
    const [selectedCountry, setSelectedCountry] = useState(
        localStorage.getItem('selectedCountry') || '',
    );

    const handleCountryChange = (countryName) => {
        setSelectedCountry(countryName);
        localStorage.setItem('selectedCountry', countryName);
    };

    return (
        <div className='App'>
            <SearchCountry onCountryChange={handleCountryChange} />
            <CurrentData selectedCountry={selectedCountry} />
        </div>
    );
};

export default Weather;
