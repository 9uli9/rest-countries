// Im importing react and hooks for managing state and side effects from react.
// im importing axios to handle http requests.
// Then im importing bootsrap to use its components like the spinner to show the component loading and the alert to notify the user of something.
// i used useEffect to handle side effects,  to get data from the API when the component is ready and visible to users or when the cuisine  changes.
// and then im importing the dish card i made earlier to display each dish.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import DishCard from "./DishCard";

// here im initializing an empty array to hold the recipes i got from the meadDb api.
// im also initializing a boolean to track whether data is being loaded.
// then im initializing an empty string to hold any error messages if getting the data fails.

/////////////////////  LOGIC ////////////////////////

const DishRow = ({ cuisine }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // the useeffect runs my fetch functions that calls the api to get cuisines.
  // it only runs if the cuisne changes!
  // axios sends a GET reques to the api to get dishes based on the cuisines if its successful it set them to the local state using setRecipes(cuisineMeals).
  // if it fails it will get caught and it will show an error message in from the setError state.

  useEffect(() => {
    const fetchCuisineRecipes = async () => {
      setLoading(true); //start loading beacuse request started
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
        );

        // getting first 3 meals from the response and formatting them

        const cuisineMeals = response.data.meals.slice(0, 3).map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          area: cuisine,
        }));

        // Updated the state with the formatted meal data

        setRecipes(cuisineMeals);
      } catch (error) {
        setError(`Error fetching ${cuisine} dishes.`);
        console.error(`Error fetching ${cuisine} dishes:`, error);
      } finally {
        setLoading(false); // when the request is done finish loading
      }
    };

    fetchCuisineRecipes(); // call this function when the component is ready to display and do it again if the cusines prop changes!
  }, [cuisine]);

  /////////////////////  RETURN  ////////////////////////

  // here im showing a spinner component from bootstrapp to show the data is loading.
  // if it hasnt loaded show an alert.
  // When its done loading show a list of dish card components.

  return (
    <div>
      <h5
        style={{
          textAlign: "center",
          fontStyle: "italic",
          textDecoration: "underline",
        }}
      >
        {cuisine} Dishes
      </h5>

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

// export the component so it can be used in other parts of the app!

export default DishRow;
