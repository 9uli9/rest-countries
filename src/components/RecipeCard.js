import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const RecipeCard = ({ title, image, area }) => {
    return (
        <Card className="mb-4 shadow-sm" style={{ maxWidth: '300px', margin: 'auto', border: 'none' }}> 
            <Row className="g-0">
                <Col xs={4} className="d-flex justify-content-center align-items-center">
                    <Card.Img 
                        variant="top" 
                        src={image} 
                        alt={title} 
                        style={{ 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '8px', 
                            objectFit: 'cover' 
                        }} 
                    />
                </Col>
                <Col xs={8}>
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                            {title}
                        </Card.Title>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default RecipeCard;
