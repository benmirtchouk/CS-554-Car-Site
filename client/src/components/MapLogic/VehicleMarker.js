import React from "react";
import { Marker, Popup } from "react-leaflet";

const VehicleMarker = (props) => {
  const { listing } = props;

  /// Convert from mongo ordering to leaflet
  const [lng, lat] = listing.location.coordinateArray;
  const location = { lat, lng };
  return (
    <Marker position={location}>
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
