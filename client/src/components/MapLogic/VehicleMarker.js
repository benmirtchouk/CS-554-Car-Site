import React from "react";
import { Marker, Popup } from "react-leaflet";

const VehicleMarker = (props) => {
  const { listing } = props;
  return (
    <Marker position={listing.location.coordinateArray}>
      <Popup>
        A {listing.metadata.modelYear} {listing.metadata.make}{" "}
        {listing.metadata.model}
        <br />
        {listing.vin}
      </Popup>
    </Marker>
  );
};

export default VehicleMarker;
