import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Spinner, Alert, Row, Col } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';
import WelcomeCard from '../components/WelcomeCard';

const AmericanCountries = () => {
    const [americanCountries, setAmericanCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // get countries from americas region
        axios.get('https://restcountries.com/v3.1/region/americas')
            .then(response => {
                setAmericanCountries(response.data); 
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching American countries:', err);
                setError('Failed to load countries. Please try again later.');
                setLoading(false);
            });
    }, []);

    // Filtering countries based on the search term
    const filteredCountries = americanCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e) => {
        setSearchTerm(e.target.value); 
    };

    return (
        <Container className="my-4">
            <WelcomeCard region="americas" /> 

            <Form className="mb-4">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search for an American country"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form>

            {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            <Row md={5} xs={1}>
                {filteredCountries.map(country => (
                    <Col key={country.ccn3} className="mb-4">
                        <CountryCard
                            flag={country.flags.png}
                            name={country.name.common}
                            region={country.region}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AmericanCountries;
