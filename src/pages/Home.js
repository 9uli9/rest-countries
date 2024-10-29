import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import WelcomeCard from '../components/WelcomeCard';
import { Row, Col, Form, Spinner, Alert, Container, Card } from 'react-bootstrap';

const Home = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountriesList(response.data);
            } catch (error) {
                console.error(error);
                setError('Error fetching countries. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCountries = countriesList.filter((country) => {
        return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <Container  className="p-0">

                 <WelcomeCard region="default" /> 

            <Form className="mb-4">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search for a country"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form>

            {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}

            {error && <Alert variant="danger">{error}</Alert>}

            <Row lg={10} md={5} xs={1}>
                {filteredCountries.map((country) => (
                    <Col key={country.ccn3}  className="mb-4">
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

export default Home;
