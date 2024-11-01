// First im importing react so i can create and use this countrycard component
// Then im importing the card component from bootstrap for styling and the link component from react router for navigation links.
// I also mad a custom ccs file for this component for more percise styling.

import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/CountryCard.css";

// Basically this component creates a card for each country with its name, flag image, and region, it has a link to the singlecountry page.

const CountryCard = ({ name, flag, region }) => {
  return (
    <Link
      to={`/country/${name}`}
      className="text-decoration-none text-dark fw-bold"
    >
      <Card
        className="my-4 shadow-sm rounded country-card"
        style={{ width: "200px" }}
      >
        <Card.Img
          src={flag}
          variant="top"
          className="img-fluid rounded-top"
          style={{ height: "100px", objectFit: "cover" }}
          alt={`Flag of ${name}`}
        />
        <Card.Body className="d-flex flex-column align-items-start">
          <Card.Title className="mb-2">{name}</Card.Title>
          <Card.Text className="text-muted small mb-0">{region}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

// I also exported the component so it can be used in other parts of the app.
export default CountryCard;
