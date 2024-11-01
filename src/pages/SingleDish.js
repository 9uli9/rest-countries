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
} from "react-bootstrap";

// setting the name parameter
// setting a states like; setting dish state, loading status as true, and error status.

const SingleDish = () => {
  const { name } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // calling the useEffect to call the fetch function which tells axios to make a GET request to the mealDB api and get all the dishes by name,

  useEffect(() => {
    const fetchDishByName = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        );
        if (response.data.meals) {
          // if u get the meals then set that state
          setDish(response.data.meals[0]); // gets the first meal
        } else {
          setError("Dish not found. Please try a different name."); // if u cant get that data then set error state
        }
      } catch (e) {
        setError("Could not fetch dish details. Please try again later.");
        console.error(e); //show error messaeg
      } finally {
        setLoading(false); //stop loading because the request is done
      }
    };

    fetchDishByName(); //start the function
  }, [name]); // only chnage it if the name prop chanegs

  if (loading) {
    //if loading then show spinner
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading dish details...</p>
      </Container>
    );
  }

  if (error) {
    //if you cant get that data then show error and alert the user
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!dish) {
    // if theres no dish show loading text
    return <div>Loading...</div>;
  }

  //make ingredients array,  loop through up to 20 ingredients and get the ingredient and measurement props for that dish from api
  // if ingredient exists then add at that object inc name and text to the array.

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = dish[`strIngredient${i}`];
    const measure = dish[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ text: `${measure} ${ingredient}`, name: ingredient });
    }
  }

  // this gets the yt url from the api
  // if the youtubeurl exists then get the unique part of the youtube video which is the video id.
  // i then put that into an iframe so it can be displayed on the page!

  const youtubeUrl = dish.strYoutube;
  const videoId = youtubeUrl ? youtubeUrl.split("v=")[1] : null;

  //this code takes the instruction block from the dish in the api.
  // if that dish has instructions to the recipie then it then splits the sentences by looking after each fullstop.
  // thats how a single instruction is created.
  // it maps through each instruction and assigns it an id and instruction text getting rid of empty space at the start.
  // everytime it makes and instruction its add 1 so its step 1, step 2 etc.

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
            {ingredients.map(
              (
                ingredient,
                index // list of ingredients, where each list item shows an image of the ingredient and its name with measurement details.
              ) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex align-items-center"
                  style={{ backgroundColor: "#ffcc00", color: "black" }}
                >
                  <Image //displaying an ingredient image for each ingredient right next to it
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
                </ListGroup.Item>
              )
            )}
          </ListGroup>

          <h5>Instructions:</h5>
          <ListGroup variant="flush" className="mb-4">
            {instructionSteps.map(
              (
                step // list of instructions, where each list item shows an id AND text so the actual instruction.
              ) => (
                <ListGroup.Item // instructions displayed in a list by bootstrap
                  key={step.id}
                  className="d-flex"
                  style={{
                    backgroundColor: "#fffbe0",
                    color: "#333",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    marginBottom: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    <strong style={{ marginRight: "8px" }}>
                      Step {step.id}:
                    </strong>
                    {step.text}
                  </div>
                </ListGroup.Item>
              )
            )}
          </ListGroup>

          {videoId && ( //this is where to unique id of the youtube video is used to put into a template for the iframe.
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
