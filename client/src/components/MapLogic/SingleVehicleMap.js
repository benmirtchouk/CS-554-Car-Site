import React from "react";
import VehicleMap from "./VehicleMap";

const SingleVehicleMap = (props) => {
  const { listing, zoomLevel } = props;
  const [lng, lat] = listing.location.coordinateArray;

  return (
    <VehicleMap
      listings={[listing]}
      center={{ lat, lng }}
      zoomLevel={zoomLevel}
    />
  );
};

export default SingleVehicleMap;
