// First im importing react so i can create and use this component.
// I also mad a custom ccs file for this component for more percise styling.
// This component is displayed on every page but changes depending on the continent.
// this component displays information about the country or region, if there is no region specified just use the default.

import React from "react";
import "../styles/InfoBanner.css";

const InfoBanner = ({ region, bgColor }) => {
  const isDefault = !region;

  // if theres no region show the defautl which is Country Index otherwise be specific to the region Discover ${region} Destinations.
  // and same goes for all text on the left and right side of the banner.

  return (
    <div className="info-banner">
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

// export the component so it can be used in other parts of the app!

export default InfoBanner;
