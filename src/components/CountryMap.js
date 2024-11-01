// First im importing react so i can create and use this component.
// Also importing react leaflet to be able to build the map

import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

// this component displays a map based on a countries location using lat and long co-ords.
// a width,height and zoom is set for the map here.
// the tilelayer shows the land, streets and overall background which is puller from OSP.
// maker is placed at the lat and long to show the countries placement to users.

const CountryMap = ({ lat, lng }) => {
  return (
    <MapContainer
      style={{ height: "400px", width: "100%" }}
      center={[lat, lng]}
      zoom={5}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]}></Marker>
    </MapContainer>
  );
};

// and again exporting the component so it can be used in other parts of the app!

export default CountryMap;
