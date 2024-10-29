// WelcomeCard.js
import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const WelcomeCard = ({ region }) => {
    // messages and titles for each region
    const messages = {
        africa: "Discover the diverse cultures and wildlife of Africa!",
        americas: "Explore the vibrant cultures and landscapes of the Americas!",
        asia: "Uncover the rich history and traditions of Asia!",
        europe: "Experience the art, history, and cuisine of Europe!",
        oceania: "Enjoy the beautiful landscapes and cultures of Oceania!",
        default: "Discover countries around the world, their flags, and regions and native dishes!",
    };

    const titles = {
        africa: "Welcome to Africa!",
        americas: "Welcome to the Americas!",
        asia: "Welcome to Asia!",
        europe: "Welcome to Europe!",
        oceania: "Welcome to Oceania!",
        default: "Welcome to World Explorer!",
    };

    const [gifs, setGifs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGifs = async () => {
        const apiKey = 'YrihuDRQCdTnElAt5jIfCx60oCmslj3b'; 
        const query = 'Tourist';
        try {
            const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
                params: {
                    api_key: apiKey,
                    q: query,
                    limit: 5,
                    offset: 0,
                    rating: 'G',
                    lang: 'en'
                }
            });
            setGifs(response.data.data);
        } catch (error) {
            console.error("Error fetching GIFs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (region === 'default') {  
            fetchGifs();
        } else {
            setLoading(false);  
        }
    }, [region]);

    return (
        <Card className="text-center mb-4 mt-4 py-4">
            <Card.Body>
                
                <Card.Title className="display-4">{titles[region] || titles.default}</Card.Title>
                <Card.Text>
                    {messages[region] || messages.default}
                </Card.Text>
                {region === 'default' && loading ? (
                    <Spinner animation="border" />
                ) : (
                    region === 'default' && (
                        <div className="d-flex flex-wrap justify-content-center">
                            {gifs.map(gif => (
                                <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} className="m-2" style={{ maxHeight: '150px' }} />
                            ))}
                        </div>
                    )
                )}
            </Card.Body>
        </Card>
    );
};

export default WelcomeCard;
