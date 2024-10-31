import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert, Form, Row, Col } from "react-bootstrap";
import DishCard from "./DishCard";

const MultiCulturalRow = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisines, setCuisines] = useState([]); // To hold the available cuisines

  // Fetch available cuisines
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        setCuisines(response.data.meals); // Store available cuisines in state
      } catch (err) {
        console.error("Error fetching cuisines:", err);
        setError("Error fetching cuisines.");
      }
    };

    fetchCuisines();
  }, []);

  // Fetch dishes based on selected cuisine (area)
  useEffect(() => {
    const fetchDishesByCuisines = async () => {
      setLoading(true);
      try {
        const allDishes = [];

        // Loop through each cuisine and fetch dishes
        for (const cuisine of cuisines) {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine.strArea}`
          );
          // If meals are found, add them to allDishes
          if (response.data.meals) {
            allDishes.push(
              ...response.data.meals.map((dish) => ({
                ...dish,
                area: cuisine.strArea, // Add area to each dish
              }))
            );
          }
        }

        setDishes(allDishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
        setError("Error fetching dishes.");
      } finally {
        setLoading(false);
      }
    };

    if (cuisines.length > 0) {
      fetchDishesByCuisines();
    }
  }, [cuisines]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="sm"
            style={{ height: "35px" }}
          />
        </Form.Group>
      </Form>

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
        <Row className="d-flex justify-content-center">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <Col key={dish.idMeal} xs={12} md={6} className="mb-4">
                <DishCard
                  title={dish.strMeal}
                  image={dish.strMealThumb}
                  area={dish.area}
                />
              </Col>
            ))
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

export default MultiCulturalRow;
