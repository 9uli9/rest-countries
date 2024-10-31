import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Spinner, Alert, Row, Col } from "react-bootstrap";
import InfoBanner from "../components/InfoBanner";
import CountryCard from "../components/CountryCard";
import WelcomeCard from "../components/WelcomeCard";
import DishRow from "../components/DishRow";

const AmericanCountries = () => {
  const [americanCountries, setAmericanCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/region/americas"
        );
        setAmericanCountries(response.data);
      } catch (error) {
        console.error("Error fetching American countries:", error);
        setError("Failed to load countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = americanCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <WelcomeCard region="americas" />
      <InfoBanner region="The Americas" />

      <Container fluid style={{ backgroundColor: "white" }}>
        <Row>
          <Col className="flex-grow-1" style={{ marginRight: "20px" }}>
            <Form className="mt-4" style={{ width: "400px" }}>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search for an American country"
                  value={searchTerm}
                  onChange={handleChange}
                  size="sm"
                  style={{ height: "35px" }}
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
          </Col>

          <Col xs={12} md={4} style={{ paddingLeft: "20px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1.5rem",
              }}
            >
              <Row>
                <Col xs={6}>
                  <DishRow cuisine="Mexican" />
                </Col>
                <Col xs={6}>
                  <DishRow cuisine="American" />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <DishRow cuisine="Canadian" />
                </Col>
                <Col xs={6}>
                  <DishRow cuisine="Jamaican" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AmericanCountries;
