// WelcomeCard.js
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import "../styles/Welcome.css"; // Ensure this includes the necessary CSS
import axios from "axios";

const WelcomeCard = ({ region }) => {
  // Messages and titles for each region
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

  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setGifs(response.data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (region === "default") {
      fetchGifs();
    } else {
      setLoading(false);
    }
  }, [region]);

  return (
    <Card className="text-center mb-4 mt-4 py-4 welcome-card">
      <Card.Body>
        <Card.Title className="display-4">
          {titles[region] || titles.default}
        </Card.Title>
        <Card.Text>{messages[region] || messages.default}</Card.Text>
        {region === "default" && loading ? (
          <Spinner animation="border" />
        ) : (
          region === "default" && (
            <div className="row justify-content-center">
              {gifs.map((gif) => (
                <div className="col-6 col-sm-3 col-md-3 p-2" key={gif.id}>
                  <img
                    src={gif.images.fixed_height.url}
                    alt={gif.title}
                    className="img-fluid" // Ensures responsiveness
                    style={{ 
                      maxHeight: "250px", // Set a max height to keep images consistent
                      objectFit: "cover",  // Ensures aspect ratio is maintained and no stretching occurs
                      width: "100%"        // Make sure it takes full width of the column
                    }} 
                  />
                </div>
              ))}
            </div>
          )
        )}
      </Card.Body>
    </Card>
  );
};

export default WelcomeCard;
