import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Spinner, Alert, Row, Col } from "react-bootstrap";
import CountryCard from "../components/CountryCard";
import WelcomeCard from "../components/WelcomeCard";
import DishRow from "../components/DishRow";

const AfricanCountries = () => {
  const [africanCountries, setAfricanCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/region/africa"
        );
        setAfricanCountries(response.data);
      } catch (err) {
        console.error("Error fetching African countries:", err);
        setError("Failed to load countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = africanCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <WelcomeCard region="africa" />

      <div
        style={{
          backgroundColor: "#ffcc00",
          padding: "10px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ textAlign: "start" }}>
          <h3>Country Index</h3>
          <p>Explore African countries!</p>
        </div>

        <div style={{ textAlign: "end" }}>
          <h3>Popular Dishes!</h3>
          <p>Why not give them a try?</p>
        </div>
      </div>

      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Container className="flex-grow-1" style={{ marginRight: "20px" }}>
          <Form className="mb-4">
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search for an African country"
                value={searchTerm}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>

          {loading && (
            <Spinner
              animation="border"
              variant="primary"
              className="d-block mx-auto"
            />
          )}

          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          <Row md={5} xs={1}>
            {filteredCountries.map((country) => (
              <Col key={country.ccn3} className="mb-4">
                <CountryCard
                  flag={country.flags.png}
                  name={country.name.common}
                  region={country.region}
                />
              </Col>
            ))}
          </Row>
        </Container>

        <Container style={{ width: "500px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Row>
              <Col xs={6}>
                <DishRow cuisine="Egyptian" />
              </Col>
              <Col xs={6}>
                <DishRow cuisine="Kenyan" />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <DishRow cuisine="Moroccan" />
              </Col>
              <Col xs={6}>
                <DishRow cuisine="Tunisian" />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <DishRow cuisine="Jamaican" />
              </Col>
            </Row>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default AfricanCountries;
