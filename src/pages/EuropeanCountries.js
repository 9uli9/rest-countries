import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';
import RecipeCard from '../components/RecipeCard'; 

const EuropeanCountries = () => {
    const [europeanCountries, setEuropeanCountries] = useState([]);
    const [recipes, setRecipes] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {

        axios.get('https://restcountries.com/v3.1/region/europe')
            .then(response => {
                setEuropeanCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching European countries:', error);
            });

 
        const fetchRecipes = async () => {
            setLoading(true); 
            try {
                const europeanAreas = ['Italian', 'French', 'Spanish', 'British', 'Greek']; 
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

        fetchRecipes();
    }, []); 

    const filteredCountries = europeanCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e) => {
        setSearchTerm(e.target.value); 
    }

    const countryCards = filteredCountries.map(country => (
        <CountryCard
            key={country.ccn3}
            flag={country.flags.png}
            name={country.name.common}
            region={country.region}
        />
    ));

    return (
        <div>
            <input 
                placeholder='Search European Countries' 
                onChange={handleChange} 
            />
            <Row md={5} xs={1}>
                {countryCards}
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
                                id={recipe.id}
                                country={recipe.country} 
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default EuropeanCountries;
