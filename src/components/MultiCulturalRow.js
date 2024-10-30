import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert, Form, Row, Col } from "react-bootstrap";
import DishCard from "./DishCard";

const MultiCulturalRow = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllDishes = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        const allDishes = [];

        for (const category of categoriesResponse.data.categories) {
          const dishesResponse = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
          );
          allDishes.push(...dishesResponse.data.meals);
        }

        setDishes(allDishes);
      } catch (error) {
        setError("Error fetching dishes.");
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDishes();
  }, []);

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
              <Col key={dish.idMeal} xs={12} className="mb-4">
                <DishCard
                  title={dish.strMeal}
                  image={dish.strMealThumb}
                  area={dish.strArea}
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
