import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Spinner, Alert, Row, Col } from "react-bootstrap";
import InfoBanner from "../components/InfoBanner";
import CountryCard from "../components/CountryCard";
import WelcomeCard from "../components/WelcomeCard";

const OceanicCountries = () => {
  const [oceanicCountries, setOceanicCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/region/oceania"
        );
        setOceanicCountries(response.data);
      } catch (err) {
        console.error("Error fetching Oceanic countries:", err);
        setError("Failed to load countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = oceanicCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <WelcomeCard region="oceania" />

      <InfoBanner region="Oceanic" />

      <Container fluid style={{ backgroundColor: "white" }}>
        <Row>
          <Col className="flex-grow-1" style={{ marginRight: "20px" }}>
            <Form className="mb-4 mt-4">
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search for an Oceanic country"
                  value={searchTerm}
                  onChange={handleChange}
                  size="sm" // Set to small size
                  style={{ height: "30px" }} // Smaller height for the search bar
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

          <Col
            xs={12}
            md={4}
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1.5rem",
              }}
            >
              {/* Message indicating that no dishes are available */}
              <Row className="mb-4">
                <Col className="text-center">
                  <Alert variant="info">
                    Unfortunately, No dishes are recorded for this region. We
                    hope to update this soon!
                  </Alert>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OceanicCountries;
