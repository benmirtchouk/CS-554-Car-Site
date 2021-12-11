/* eslint-disable react/prop-types */

import React from "react";

import { Link } from "react-router-dom";

const SearchCard = (props) => {
  const fallbackImage = "/images/ImgNotAvailable.png";
  const img = "";

  const { data, listing } = props;
  const { vin } = listing;
  const { metadata } = data;
  const { make, model, modelYear } = metadata;

  const key = `search-${
    vin !== undefined ? vin : `${modelYear}-${make}-${model}`
  }`;

  const isForSale = listing != null && !!Object.keys(listing).length;

  return (
    <div key={key} className="card">
      <img
        className="img-responsive mx-2 px-2"
        src={img}
        alt="Vehicle"
        onError={(e) => {
          e.target.src = fallbackImage;
          e.onerror = null;
        }}
      />

      <div className="card-body">
        <div className="card-title">
          {make} {model} {modelYear}
        </div>
        <div className="card-text">
          {isForSale ? (
            <ListingDetails listing={listing} />
          ) : (
            "Not currently listed for sale"
          )}
          <div>
            <Link
              to={{
                pathname: "/safety",
                state: {
                  make,
                  model,
                  year: modelYear,
                },
              }}
            >
              {" "}
              Safety Info{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListingDetails = (props) => {
  const { listing } = props;
  const { vin, exteriorColor, interiorColor, millage, price, location } =
    listing;

  const key = `listing-${vin}`;
  return (
    <div className="flex flex-col content-around" key={key}>
      <div>Listed for Sale</div>
      <div>
        <span className="flex content-between">
          {" "}
          <span className="pr8"> Price: {price}</span>{" "}
          <span> Millage {millage}</span>
        </span>
        <span className="flex content-between">
          {" "}
          Colors: <span> Exterior {exteriorColor} </span>{" "}
          <span>Interior {interiorColor} </span>
        </span>
      </div>
      Location {location}
    </div>
  );
};

export default SearchCard;
