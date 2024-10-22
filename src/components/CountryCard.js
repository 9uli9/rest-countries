import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CountryCard = ({ name, flag, region }) => {
    return (
        <Card className="my-4 shadow-sm border-0 rounded">
            <Card.Img 
                src={flag} 
                variant="top" 
                className="img-fluid rounded-top"
                style={{ height: "180px", objectFit: "cover" }}
                alt={`Flag of ${name}`}
            />
            <Card.Body className="d-flex flex-column align-items-start">
                <Card.Title className="mb-2">
                    <Link 
                        to={`/country/${name}`} 
                        className="text-decoration-none text-dark fw-bold"
                    >
                        {name}
                    </Link>
                </Card.Title>
                <Card.Text className="text-muted small mb-0">
                    {region}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CountryCard;
