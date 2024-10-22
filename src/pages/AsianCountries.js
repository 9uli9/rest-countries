import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';

const AsianCountries = () => {
    const [asianCountries, setAsianCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
       
        axios.get('https://restcountries.com/v3.1/region/asia')
            .then(response => {
                setAsianCountries(response.data); 
            })
            .catch(error => {
                console.error('Error fetching Asian countries:', error);
            });
    }, []);

    const filteredCountries = asianCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e) => {
        setSearchTerm(e.target.value); 
    }

    const countryCards = filteredCountries.map(country => {
        return (
            <CountryCard
                key={country.ccn3}
                flag={country.flags.png}
                name={country.name.common}
                region={country.region}
            />
        );
    });

    return (
        <div>
            <input 
                placeholder='Search Asian Countries' 
                onChange={handleChange} 
            />
            <Row md={3} xs={1}>
                {countryCards}
            </Row>
        </div>
    );
};

export default AsianCountries;
