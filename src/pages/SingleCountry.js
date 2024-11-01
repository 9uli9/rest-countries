import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Image,
  Card,
  Container,
  Spinner,
  Alert,
} from "react-bootstrap";

// importing map component

import CountryMap from "../components/CountryMap";

// setting the name parameter
// setting a states like; setting country state, search term status, loading status as true, and error status.

const SingleCountry = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // usign useEffect to call a function that gets the axios to request a GET request to the rest countries api and get countries by the name param.

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        setCountry(response.data[0]); // when it gets a country it updates the state of this
      } catch (e) {
        setError("Could not fetch country details. Please try again later.");
        console.error(e); // set error state if it cant get the country data
      } finally {
        setLoading(false); // stop loading because the request is over
      }
    };

    fetchCountry(); // runs only once when the component is first rendered
  }, [name]); // run this if the name changes

  if (loading) {
    // if its loading show spinner
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading country details...</p>
      </Container>
    );
  }

  if (error) {
    // if it couldnt get the data show an alert
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!country) {
    //if theres no country show loading
    return <div>Loading...</div>;
  }

  // then display the country details with a flag, common name,capital subregion etc
  // this is displayed in columns and rows and styling with bootstrap

  return (
    <Container
      className="my-5"
      style={{
        backgroundColor: "#ffcc00",
        color: "white",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Card className="shadow-lg">
        <Row className="g-0">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Image
              src={country.flags.png}
              alt={`${country.name.common}'s flag`}
              style={{
                borderRadius: "5px",
                maxHeight: "300px",
                objectFit: "cover",
                border: "3px solid black",
              }}
            />
          </Col>
          <Col md={6} className="p-4">
            <h1>{country.name.common}</h1>
            <h2 className="text-secondary">
              Official Name: {country.name.official}
            </h2>
            <p>
              <strong>Capital:</strong>{" "}
              {country.capital ? country.capital[0] : "N/A"}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            {country.subregion && (
              <p>
                <strong>Sub-Region:</strong> {country.subregion}
              </p>
            )}
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Area:</strong> {country.area.toLocaleString()} km²
            </p>
            <p>
              <strong>Time Zones:</strong> {country.timezones.join(", ")}
            </p>
            <p>
              <strong>Languages:</strong>
            </p>
            <ul>
              {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <p>
              <strong>Currency:</strong>{" "}
              {Object.values(country.currencies)[0].name} (
              {Object.values(country.currencies)[0].symbol})
            </p>
            {country.borders && (
              <p>
                <strong>Borders:</strong> {country.borders.join(", ")}
              </p>
            )}
          </Col>
        </Row>

        <CountryMap lat={country.latlng[0]} lng={country.latlng[1]} />
      </Card>
    </Container>
  );
};

export default SingleCountry;
