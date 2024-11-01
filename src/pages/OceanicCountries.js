import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Spinner, Alert, Row, Col } from "react-bootstrap";

// getting all my components i made earlier
import InfoBanner from "../components/InfoBanner";
import CountryCard from "../components/CountryCard";
import WelcomeCard from "../components/WelcomeCard";

// setting a states like; setting OCEANIC countries, search term status, loading status as true, and error status.

const OceanicCountries = () => {
  const [oceanicCountries, setOceanicCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // get axios to make a GET http request to the RESTcountries api to get all countries in the OCEANIC region.

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true); //start loading because were making a request
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/region/oceania"
        );
        setOceanicCountries(response.data); // set state with the data you got about OCEANIC countries
      } catch (err) {
        console.error("Error fetching Oceanic countries:", err);
        setError("Failed to load countries. Please try again later.");
      } finally {
        setLoading(false); // stop loading the request is done
      }
    };

    fetchCountries(); // run this
  }, []); // onyl runs once after first render

  // filter the OCEANIC countries based on the search term entered by the user include lowercase searches

  const filteredCountries = oceanicCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // update the search term as the user types and search term state with the input value which is probably a name of an OCEANIC country.

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // show the OCEANIC themed welcome card and info banner based on africa region

  return (
    <>
      <WelcomeCard region="oceania" />

      <InfoBanner region="Oceanic" />

      <Container fluid style={{ backgroundColor: "white" }}>
        <Row>
          <Col className="flex-grow-1" style={{ marginRight: "20px" }}>
            <Form className="mb-4 mt-4">
              <Form.Group controlId="search">
                <Form.Control //search bar to filter through OCEANIC countries when user types
                  type="text"
                  placeholder="Search for an Oceanic country"
                  value={searchTerm}
                  onChange={handleChange} // update the state on if the user types soemthing new
                  size="sm"
                  style={{ height: "30px" }}
                />
              </Form.Group>
            </Form>

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

            <Row md={5} xs={1}>
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
              {/*nO OCEANIC DISHES ARE AVAILABLE IN THE API */}
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
