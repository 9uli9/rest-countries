import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Spinner, Alert, Row, Col } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';
import RecipeCard from '../components/RecipeCard';
import WelcomeCard from '../components/WelcomeCard';

const EuropeanCountries = () => {
    const [europeanCountries, setEuropeanCountries] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/region/europe');
                setEuropeanCountries(response.data);
            } catch (error) {
                console.error('Error fetching European countries:', error);
                setError('Failed to load countries. Please try again later.');
            }
        };

        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const europeanAreas = ['Italian', 'French', 'Spanish', 'British', 'Greek', 'Polish'];
                const recipeRequests = europeanAreas.map(area =>
                    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
                );

                const responses = await Promise.all(recipeRequests);
                const allRecipes = responses.flatMap(response =>
                    response.data.meals.map(meal => ({
                        id: meal.idMeal,
                        title: meal.strMeal,
                        image: meal.strMealThumb,
                        country: meal.strArea
                    }))
                );

                setRecipes(allRecipes);
            } catch (error) {
                setError('Error fetching European dishes.');
                console.error('Error fetching European dishes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
        fetchRecipes();
    }, []);

    const filteredCountries = europeanCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Container className="my-4">
            <WelcomeCard region="europe" />

            <Form className="mb-4">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search for a European country"
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

            <h2>European Dishes</h2>
            {loading ? (
                <p>Loading recipes...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Row md={5} xs={1}>
                    {recipes.map(recipe => (
                        <Col key={recipe.id}>
                            <RecipeCard
                                title={recipe.title}
                                image={recipe.image}
                                area={recipe.area}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default EuropeanCountries;
