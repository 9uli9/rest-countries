import { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "../components/CountryCard";
import WelcomeCard from "../components/WelcomeCard";
import MultiCulturalRow from "../components/MultiCulturalRow";
import InfoBanner from "../components/InfoBanner";
import { Row, Col, Form, Spinner, Alert, Container } from "react-bootstrap";

const Home = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountriesList(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCountries = countriesList.filter((country) => {
    return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <WelcomeCard region="default" />
      <div className="d-flex justify-content-center"></div>

      <InfoBanner />

      <Container fluid style={{ backgroundColor: "white" }}>
        <Row>
          {/* Countries Column */}
          <Col xs={5} sm={5} md={8} className="mb-4">
            {loading && (
              <Spinner
                animation="border"
                variant="primary"
                className="d-block mx-auto"
              />
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            <Form className="mt-4" style={{ width: "400px" }}>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search for any country"
                  value={searchTerm}
                  onChange={handleChange}
                  size="sm"
                  style={{ height: "35px" }}
                />
              </Form.Group>
            </Form>

            <Row xl={5} lg={3} md={2} sm={1} xs={1} className="g-4">
              {filteredCountries.map((country) => (
                <Col key={country.ccn3}>
                  <CountryCard
                    flag={country.flags.png}
                    name={country.name.common}
                    region={country.region}
                  />
                </Col>
              ))}
            </Row>
          </Col>

          {/* MultiCulturalRow Column */}
          <Col xs={7} sm={6} md={4}>
            <MultiCulturalRow />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
