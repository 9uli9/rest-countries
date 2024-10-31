// InfoBanner.js
import React from "react";
import "../styles/InfoBanner.css";

const InfoBanner = ({ region, bgColor }) => {
  const isDefault = !region;

  return (
    <div
      className="info-banner"
      style={{ backgroundColor: bgColor || "#ffcc00" }}
    >
      <div className="left">
        <h3>
          {isDefault ? "Country Index" : `Discover ${region} Destinations`}
        </h3>
        <p>Start Exploring New Cultures Today!</p>
      </div>

      <div className="right">
        <h3>
          {isDefault ? "Discover Popular Dishes!" : `Delicious ${region} Foods`}
        </h3>
        <p>
          {isDefault
            ? "Find Something Delicious To Try Today!"
            : `Taste ${region}, One Dish At A Time!`}
        </p>
      </div>
    </div>
  );
};

export default InfoBanner;
