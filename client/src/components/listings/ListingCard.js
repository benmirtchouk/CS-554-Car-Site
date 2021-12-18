import React from "react";
import { Link } from "react-router-dom";
import SingleVehicleMap from "../MapLogic/SingleVehicleMap";

const ListingCard = (props) => {
  const { listing } = props;

  return (
    <div className="listing">
      <dl>
        <div>
          <dt>exteriorColor:</dt>
          <dd>{listing.exteriorColor}</dd>
        </div>
        <div>
          <dt>interiorColor:</dt>
          <dd>{listing.interiorColor}</dd>
        </div>
        {/* <div>
          <dt>metadata:</dt>
          <dd>{listing.metadata}</dd>
        </div> */}
        <div>
          <dt>mileage:</dt>
          <dd>{listing.millage}</dd>
        </div>
        {/* <div>
          <dt>photos:</dt>
          <dd>{listing.photos}</dd>
        </div> */}
        <div>
          <dt>price:</dt>
          <dd>{listing.price}</dd>
        </div>
        <div>
          <dt>sellerId:</dt>
          <dd>{listing.sellerId}</dd>
        </div>
        <div>
          <dt>vin:</dt>
          <dd>{listing.vin}</dd>
        </div>
        <Link to={`/listing/${listing._id}`}>View Listing</Link>
      </dl>
      <SingleVehicleMap listing={listing} zoomLevel="13" />
    </div>
  );
};

export default ListingCard;
