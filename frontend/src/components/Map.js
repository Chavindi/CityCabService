import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import axios from "axios";
import polyline from "@mapbox/polyline";  // To decode polyline geometry

const MapComponent = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState([]);

  const handleDirections = () => {
    // Send request to the backend with pickup and destination
    axios
      .get(
        `http://localhost:8080/api/route/getRoute?origin=${pickup}&destination=${destination}`
      )
      .then((response) => {
        const routeSteps = response.data.routes[0].legs[0].steps;
        const coordinates = [];
        
        // Decode each step's geometry into lat/lng coordinates
        routeSteps.forEach((step) => {
          const decoded = polyline.decode(step.geometry);
          coordinates.push(...decoded);
        });

        setRoute(coordinates);
      })
      .catch((error) => {
        console.error("Error fetching route:", error);
      });
  };

  return (
    <div>
      <h1>Cab Service</h1>
      <input
        type="text"
        placeholder="Enter Pickup Location (lat,lng)"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Destination Location (lat,lng)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleDirections}>Get Route</button>

      <MapContainer
        center={[6.927075, 79.861194]} // Default center of the map (from your example)
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
