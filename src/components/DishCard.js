// First im importing react so i can create and use this component.
// Then im importing bootsrap to use its components like the card, row and column for easy layout and styling.
// And the link component from react router for navigation links to other pages.

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/DishCard.css";

// this component displays a small, clickable card for each dish with its image, title, and cuisine area which is whatever country the dish is from.
// The card is wrappaed in a link, so when a user clicks it brings them to a singlular dish page.
// The rest of the code is jsut styling with bootstrap like shadows, margins, and centered positioning of the card.

const DishCard = ({ title, image, area }) => {
  return (
    <Link
      to={`/dish/${title}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        className="mb-4 shadow-sm dish-card"
        style={{ maxWidth: "300px", margin: "auto", border: "none" }}
      >
        <Row className="g-0">
          <Col
            xs={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Card.Img
              variant="top"
              src={image}
              alt={title}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col xs={8}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                {title}
              </Card.Title>
              <Card.Text style={{ fontSize: "12px", color: "black" }}>
                {area} Cuisine
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

//// and again exporting the component so it can be used in other parts of the app!

export default DishCard;
