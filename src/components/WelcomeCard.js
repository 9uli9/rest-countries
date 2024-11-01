// WelcomeCard.js
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import "../styles/Welcome.css";
import axios from "axios";

// this component creates a welcome card for a user depending on the continent page they are on.
// each continent has a unique title and message depending on the region prop.
// if its the home page itll show the default title and message.

/////////////////////  LOGIC ////////////////////////

const WelcomeCard = ({ region }) => {
  const messages = {
    africa: "Discover diverse cultures and dishes of Africa!",
    americas: "Discover diverse cultures and dishes of the Americas!",
    asia: "Discover diverse cultures and dishes of Asia!",
    europe: "Discover diverse cultures and dishes of Europe!",
    oceania: "Discover diverse cultures and dishes of Oceania!",
    default:
      "Discover continents and countries around the world, their flags, and regions and native dishes!",
  };

  const titles = {
    africa: "🦁 Welcome to Africa! 🥙",
    americas: "🗽 Welcome to the Americas! 🥩",
    asia: "🏯 Welcome to Asia! 🍜",
    europe: "🏰 Welcome to Europe! 🍝",
    oceania: "🌊 Welcome to Oceania! 🥥",
    default: "🌏 Welcome to Country Cuisine! 🍽️",
  };

  //setting a state to hold gifs from giphy
  // setting a loading state to hold the loading status of the gifs

  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch gifs gets axios to send a GET request to the GIPHY api with my API key i was provided from their page.
  // i want it to hold a query that searches for giphys similar to people trying food for the homepage.
  // it gets 4 giphs of people trying food
  // with a kid friendly rating and in english.

  const fetchGifs = async () => {
    const apiKey = "YrihuDRQCdTnElAt5jIfCx60oCmslj3b";
    const query = "Trying Food";
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: apiKey,
          q: query,
          limit: 4, // Change the limit to 4
          offset: 0,
          rating: "G",
          lang: "en",
        },
      });
      setGifs(response.data.data); //update state with the gifs u got
    } catch (error) {
      console.error("Error fetching GIFs:", error); // show error if you couldnt get them (i found out u can only make 100 requests per hour)
    } finally {
      setLoading(false); // stop loading the request is done
    }
  };

  useEffect(() => {
    if (region === "default") {
      // only get gifs if the user is on the homepage (default welcome card)
      fetchGifs();
    } else {
      setLoading(false);
    }
  }, [region]); //this runs if the region changes or the user goes onto a diffferent continet page

  /////////////////////  RETURN ////////////////////////

  return (
    <Card className="text-center mb-4 mt-4 py-4 welcome-card">
      <Card.Body>
        <Card.Title className="display-4">
          {titles[region] || titles.default}
        </Card.Title>
        <Card.Text>{messages[region] || messages.default}</Card.Text>
        {region === "default" && loading ? (
          <Spinner animation="border" /> //show spinnter if the region is defautl and its loading
        ) : (
          region === "default" && ( // if region is default and loading is complete do this
            <div className="row justify-content-center">
              {gifs.map(
                (
                  gif // go over each gif
                ) => (
                  <div className="col-6 col-sm-3 col-md-3 p-2" key={gif.id}>
                    <img
                      src={gif.images.fixed_height.url} // set the source of the image to the GIF URL and gif styling
                      alt={gif.title}
                      className="img-fluid"
                      style={{
                        maxHeight: "250px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                )
              )}
            </div>
          )
        )}
      </Card.Body>
    </Card>
  );
};

// export the component so it can be used in other parts of the app!
export default WelcomeCard;
