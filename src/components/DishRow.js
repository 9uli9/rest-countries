import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import DishCard from "./DishCard";

const DishRow = ({ cuisine }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCuisineRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
        );
        const cuisineMeals = response.data.meals.slice(0, 3).map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          area: cuisine,
        }));
        setRecipes(cuisineMeals);
      } catch (error) {
        setError(`Error fetching ${cuisine} dishes.`);
        console.error(`Error fetching ${cuisine} dishes:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchCuisineRecipes();
  }, [cuisine]);

  return (
    <div>
      <h5>{cuisine} Dishes</h5>
      {loading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="d-block mx-auto"
        />
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {recipes.map((recipe) => (
            <DishCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              area={cuisine}
              style={{ marginBottom: "10px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DishRow;
