import axios from 'axios';

export default async function fetchCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = {};
        response.data.forEach((country) => {
            countries[country.name.common] = country.name.common;
        });
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
}
