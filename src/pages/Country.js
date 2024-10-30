import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image, Row, Col } from "react-bootstrap";

const Country = () => {
  const { name } = useParams();

  const [country, setCountry] = useState({});

  // We could make a second API request here to get more details about the country
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!country.name || !country.flags) {
    return <p>Loading...</p>;
  }

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
