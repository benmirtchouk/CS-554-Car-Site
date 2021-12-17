import React from "react";
import VehicleMap from "./VehicleMap";

const SingleVehicleMap = (props) => {
  const { listing, zoomLevel } = props;

  return (
    <VehicleMap
      listings={[listing]}
      center={listing.location.coordinateArray}
      zoomLevel={zoomLevel}
    />
  );
};

export default SingleVehicleMap;
