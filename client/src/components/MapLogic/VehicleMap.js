import React from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import VehicleMarker from "./VehicleMarker";

const VehicleMap = (props) => {
  const { listings, center, zoomLevel } = props;

  if (!center || !zoomLevel) {
    throw new Error(`Not set! ${center} ${zoomLevel}`);
  }
  return (
    <MapContainer
      className="mapcontainer"
      center={center}
      zoom={zoomLevel}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((e) => (
        <VehicleMarker listing={e} />
      ))}
    </MapContainer>
  );
};

export default VehicleMap;
