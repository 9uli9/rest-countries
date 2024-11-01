import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Spinner, Alert, Row, Col } from "react-bootstrap";

// getting all my components i made earlier

import InfoBanner from "../components/InfoBanner";
import CountryCard from "../components/CountryCard";
import WelcomeCard from "../components/WelcomeCard";
import DishRow from "../components/DishRow";

// setting a states like; setting asian countries, search term status, loading status as true, and error status.

const AsianCountries = () => {
  const [asianCountries, setAsianCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // get axios to make a GET http request to the RESTcountries api to get all countries in the asian region.

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true); //start loading because were making a request
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/region/asia"
        );
        setAsianCountries(response.data); // set state with the data you got about asian countries
      } catch (error) {
        console.error("Error fetching Asian countries:", error);
        setError("Failed to load countries. Please try again later.");
      } finally {
        setLoading(false); // stop loading the request is done
      }
    };

    fetchCountries(); // run this
  }, []); // onyl runs once after first render

  // filter the asian countries based on the search term entered by the user include lowercase searches

  const filteredCountries = asianCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // update the search term as the user types and search term state with the input value which is probably a name of an asian country.

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // show the asian themed welcome card and info banner based on africa region

  return (
    <>
      <WelcomeCard region="asia" />
      <InfoBanner region="Asian" />

      <Container fluid style={{ backgroundColor: "white" }}>
        <Row>
          {/* Countries Column */}
          <Col xs={6} sm={6} md={8} className="mb-4">
            {loading && ( //when its loading the country columns show spinner or error if it fails
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

            <Form className="mt-4" style={{ width: "400px" }}>
              <Form.Group controlId="search">
                <Form.Control //search bar to filter through asian countries when user types
                  type="text"
                  placeholder="Search for an Asian country"
                  value={searchTerm}
                  onChange={handleChange} // update the state on if the user types soemthing new
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
                  <Col key={country.ccn3} className="mb-4">
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
          {/* DishRow column  for asian dishes displayed to the right of the countries index*/}
          {/* DishRow is gonna display 3 dish cards for each of the asian cuisines mentioned bellow*/}
          <Col xs={6} sm={6} md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <Row>
                <Col xs={12} md={6}>
                  <DishRow cuisine="Chinese" />
                </Col>
                <Col xs={12} md={6}>
                  <DishRow cuisine="Filipino" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <DishRow cuisine="Indian" />
                </Col>
                <Col xs={12} md={6}>
                  <DishRow cuisine="Japanese" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <DishRow cuisine="Malaysian" />
                </Col>
                <Col xs={12} md={6}>
                  <DishRow cuisine="Thai" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <DishRow cuisine="Vietnamese" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AsianCountries;
