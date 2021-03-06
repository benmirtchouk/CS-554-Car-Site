import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import VehicleMarker from "./VehicleMarker";

const VehicleMap = (props) => {
  const { listings, center, zoomLevel, className } = props;

  return (
    <MapContainer
      className={`mapcontainer ${className}`}
      center={center}
      zoom={zoomLevel}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((e) => (
        <VehicleMarker
          listing={e}
          key={`marker-${e._id}`}
        />
      ))}
    </MapContainer>
  );
};

export default VehicleMap;
