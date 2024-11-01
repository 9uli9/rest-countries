import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image, Row, Col } from "react-bootstrap";

const Country = () => {
  // setting the parameter to name and setting country state
  const { name } = useParams();
  const [country, setCountry] = useState({});

  // This is calling axios to send a GET request to the rest countries api to get all countries by name
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response) => {
        setCountry(response.data[0]); // when it gets that data it updates the state
      })
      .catch((error) => {
        console.error(error); // if it doesnt get the data it shows an error message and update the state
      });
  }, []);

  if (!country.name || !country.flags) {
    // if it cant get country name of flags it returns loading
    return <p>Loading...</p>;
  }

  // when it does get the data it shows a country with i row and columns with props like image,common name, official name, region, subregion and currency.
  return (
    <div>
      <Row>
        <Col>
          <Image
            src={country.flags?.png}
            alt={`${country.name?.common}'s flag`}
          />
        </Col>
        <Col>
          <p>
            <b>Common Name:</b> {country.name.common}
          </p>
          <p>
            <b>Official Name:</b> {country.name.official}
          </p>
          <p>
            <b>Region:</b> {country.region}
          </p>
          <p>
            <b>Sub Region:</b> {country.subregion}
          </p>
          <p>
            <b>Currency:</b> {Object.values(country.currencies)[0].name}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Country;
