// Im importing react and hooks for managing state and side effects from react.
// im importing axios to handle http requests.
// Then im importing bootsrap to use its components like the spinner to show the component loading and the alert to notify the user of something.
// im importing form, row and column for layout and styling.
// and then im importing the dish card i made earlier to display each dish.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert, Form, Row, Col } from "react-bootstrap";
import DishCard from "./DishCard";

/////////////////////  LOGIC ////////////////////////

// This function displays a collection of dishes from various cuisines for the homepage.
// im using mutiple states to hold differnt things like;
// list of dishes, loading status, error messages, search input for the search bar and available cuisines.

const MultiCulturalRow = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisines, setCuisines] = useState([]);

  // GET ALL CUISINES
  // When the component is activated get axios to send a GET request to the mealDB api to get a list of all cuisines (which is called area list in mealDB).
  // when u get them store them in setCuisines state, if this fails then log an error and update this state.

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        setCuisines(response.data.meals); // store in this state
      } catch (err) {
        console.error("Error fetching cuisines:", err);
        setError("Error fetching cuisines.");
      }
    };

    fetchCuisines(); // call this function when the component is ready to display and get cuisines and do it again if the cusines prop changes!
  }, []);

  // GET ALL DISHES FROM A CUISINE
  // get dishes based on selected cuisine (which is called area in mealDB)

  useEffect(() => {
    const fetchDishesByCuisines = async () => {
      setLoading(true); // the resquest is starting so start loading
      try {
        const allDishes = [];

        // go through each cuisine and get dishes for each cuisine(AREA)

        for (const cuisine of cuisines) {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine.strArea}`
          );

          // if theyre found add them to allDishes AND ADD AREA

          if (response.data.meals) {
            allDishes.push(
              ...response.data.meals.map((dish) => ({
                ...dish,
                area: cuisine.strArea,
              }))
            );
          }
        }

        setDishes(allDishes); //update state with the dishes you got
      } catch (error) {
        console.error("Error fetching dishes:", error);
        setError("Error fetching dishes."); // give and error if you cant update this state
      } finally {
        setLoading(false); //Stop loading because request is done
      }
    };

    if (cuisines.length > 0) {
      fetchDishesByCuisines(); // get dishes if there are cuisines
    }
  }, [cuisines]); // do this if or when the cuisines state changes

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // update the searchTerm state with the current input value
  };

  //filter dishes based on whatever the user searched for on the home page inclue lower case too.

  const filteredDishes = dishes.filter((dish) =>
    dish.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /////////////////////  RETURN ////////////////////////

  return (
    <div className="mt-4">
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={handleSearchChange} // update search term on if the user types anything new in the search bar.
            size="sm"
            style={{ height: "35px" }}
          />
        </Form.Group>
      </Form>

      {loading ? ( // if the data is loading show spinner
        <Spinner
          animation="border"
          variant="primary"
          className="d-block mx-auto"
        />
      ) : error ? ( // if the data is not loaded show alert
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <Row className="d-flex justify-content-center">
          {filteredDishes.length > 0 ? ( //if theres dishes in this array do the following
            filteredDishes.map(
              (
                dish //get a new col for each dish
              ) => (
                <Col key={dish.idMeal} xs={12} md={6} className="mb-4">
                  <DishCard
                    title={dish.strMeal}
                    image={dish.strMealThumb}
                    area={dish.area} //give dish area to DishCard
                  />
                </Col>
              )
            )
          ) : (
            <Alert variant="info" className="text-center">
              No dishes found.
            </Alert>
          )}
        </Row>
      )}
    </div>
  );
};

// export the component so it can be used in the home

export default MultiCulturalRow;
