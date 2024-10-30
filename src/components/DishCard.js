// src/components/DishCard.js
import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/DishCard.css";

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
                  fontSize: "10px",
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

export default DishCard;
