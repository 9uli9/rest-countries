import { useEffect, useState } from "react";
import axios from "axios";

// importing previously made components

import CountryCard from "../components/CountryCard";
import WelcomeCard from "../components/WelcomeCard";
import MultiCulturalRow from "../components/MultiCulturalRow";
import InfoBanner from "../components/InfoBanner";

// importing bootstrap components
import { Row, Col, Form, Spinner, Alert, Container } from "react-bootstrap";

// setting a states like; list of countries, search term status, loading status as true, and error status.
const Home = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // this calls the fetch coutries function to get axios to send a GET request to the rest countries api and get all countries

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountriesList(response.data); // when it gets all the countries it updates the state of this
      } catch (error) {
        console.error(error); // if it doesnt get that data it updates the state
        setError("Error fetching countries. Please try again later.");
      } finally {
        setLoading(false); // stop loading as the request is done
      }
    };

    fetchCountries();
  }, []); // runs only once when the component is first rendered

  // update the search term as the user types and search term state with the input value which is probably a name of a country.

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // from all the countries that are filtered get the country that matches the one the user searched for
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
            {loading && ( //when its loading the country columns show spinner or error if it fails
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
              {filteredCountries.map(
                (
                  country // get the filtered africna countries and display them in columns and rows
                ) => (
                  <Col key={country.ccn3}>
                    <CountryCard
                      flag={country.flags.png}
                      name={country.name.common}
                      region={country.region}
                    />
                  </Col>
                )
              )}
            </Row>
          </Col>

          {/* MultiCulturalRow Column is shown from the multicultural row components i previous created and imported */}
          <Col xs={7} sm={6} md={4}>
            <MultiCulturalRow />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
