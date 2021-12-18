import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const VehicleMarker = (props) => {
  const { listing } = props;

  /// Convert from mongo ordering to leaflet
  const [lng, lat] = listing.location;
  const location = { lat, lng };
  return (
    <Marker position={location}>
      <Popup>
        A {listing?.metadata?.modelYear} {listing?.metadata?.make}{" "}
        {listing?.metadata?.model}
        <br />
        {listing?.vin}
        <br />
        {listing?.sold ? 'Sold' : 'For Sale'}
        <br />
        <Link to={`/listing/${listing?._id}`}>View Listing</Link>
      </Popup>
    </Marker>
  );
};

export default VehicleMarker;
