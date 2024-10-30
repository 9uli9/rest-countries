import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Image,
  Spinner,
  Alert,
  ListGroup,
  Form,
} from "react-bootstrap";

const SingleDish = () => {
  const { name } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});

  useEffect(() => {
    const fetchDishByName = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        );
        if (response.data.meals) {
          setDish(response.data.meals[0]);
        } else {
          setError("Dish not found. Please try a different name.");
        }
      } catch (e) {
        setError("Could not fetch dish details. Please try again later.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDishByName();
  }, [name]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading dish details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!dish) {
    return <div>Loading...</div>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = dish[`strIngredient${i}`];
    const measure = dish[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ text: `${measure} ${ingredient}`, name: ingredient });
    }
  }

  const handleCheckboxChange = (index) => {
    setCheckedIngredients((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleStepCheckboxChange = (index) => {
    setCheckedSteps((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const youtubeUrl = dish.strYoutube;
  const videoId = youtubeUrl ? youtubeUrl.split("v=")[1] : null;

  const instructionSteps = dish.strInstructions
    ? dish.strInstructions.split(". ").map((step, index) => ({
        id: index + 1,
        text: step.trim(),
      }))
    : [];

  return (
    <Container
      className="my-5"
      style={{
        backgroundColor: "#ffcc00",
        color: "white",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Card className="shadow-lg">
        <Card.Header className="text-center">
          <h1>{dish.strMeal}</h1>
        </Card.Header>
        <Card.Body>
          <Image
            src={dish.strMealThumb}
            alt={dish.strMeal}
            style={{
              borderRadius: "5px",
              width: "50%",
              maxHeight: "400px",
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
            }}
            className="mb-4"
          />

          <div className="text-center mb-4">
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Cuisine: {dish.strArea}
            </p>
          </div>

          <h5>Ingredients:</h5>
          <ListGroup variant="flush" className="mb-4">
            {ingredients.map((ingredient, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex align-items-center"
                style={{ backgroundColor: "#ffcc00", color: "black" }}
              >
                <span
                  style={{
                    textDecoration: checkedIngredients[index]
                      ? "line-through"
                      : "none",
                    transition: "text-decoration 0.2s",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={`https://www.themealdb.com/images/ingredients/${ingredient.name}.png`}
                    alt={ingredient.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />

                  {ingredient.text}
                </span>
                <Form.Check
                  type="checkbox"
                  checked={!!checkedIngredients[index]}
                  onChange={() => handleCheckboxChange(index)}
                  style={{ marginLeft: "auto", transform: "scale(1.2)" }}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h5>Instructions:</h5>
          <ListGroup variant="flush" className="mb-4">
            {instructionSteps.map((step, index) => (
              <ListGroup.Item
                key={step.id}
                className="d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: "#fffbe0",
                  color: "#333",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <span
                  style={{
                    textDecoration: checkedSteps[index]
                      ? "line-through"
                      : "none",
                    transition: "text-decoration 0.2s",
                  }}
                >
                  <strong style={{ marginRight: "8px" }}>
                    Step {step.id}:
                  </strong>
                  {step.text}
                </span>
                <Form.Check
                  type="checkbox"
                  checked={!!checkedSteps[index]}
                  onChange={() => handleStepCheckboxChange(index)}
                  style={{ transform: "scale(1.2)" }}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>

          {videoId && (
            <div className="mt-4">
              <h5>Watch Preparation Video:</h5>
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Recipe Video"
                  allowFullScreen
                  style={{ borderRadius: "8px" }}
                />
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleDish;
