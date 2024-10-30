import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/CountryCard.css";

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

export default CountryCard;
