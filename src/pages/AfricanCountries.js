import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Spinner, Alert, Row, Col } from "react-bootstrap";
import InfoBanner from "../components/InfoBanner";
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

      <InfoBanner region="African" />

      <Container fluid style={{ backgroundColor: "white" }}>
        <Row>
          <Col className="flex-grow-1" style={{ marginRight: "20px" }}>
            <Form className="mt-4" style={{ width: "400px" }}>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search for an African country"
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
                  <DishRow cuisine="Egyptian" />
                </Col>
                <Col xs={6}>
                  <DishRow cuisine="Tunisian" />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <DishRow cuisine="Moroccan" />
                </Col>
                <Col xs={6}>
                  <DishRow cuisine="Jamaican" />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <DishRow cuisine="Kenyan" />
                </Col>
                <Col xs={6}></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AfricanCountries;
