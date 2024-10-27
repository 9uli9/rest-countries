// RecipeCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const RecipeCard = ({ title, image, id }) => {
    return (
        <Card className="recipe-card m-2" style={{ width: '150px', height: '200px' }}>
            <Link to={`/recipe/${id}`}>
                <Card.Img 
                    variant="top" 
                    src={image} 
                    alt={title} 
                    className="img-fluid" // Make the image responsive
                    style={{ height: '100px', objectFit: 'cover' }} // Maintain aspect ratio
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="recipe-title text-center" style={{ fontSize: '0.9rem' }}>
                        {title}
                    </Card.Title>
                </Card.Body>
            </Link>
        </Card>
    );
};

export default RecipeCard;
