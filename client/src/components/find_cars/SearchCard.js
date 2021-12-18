/* eslint-disable react/prop-types */

import React from "react";
import { Badge, Button, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SingleVehicleMap from "../MapLogic/SingleVehicleMap";

const SearchCard = (props) => {
  const fallbackImage = "/images/ImgNotAvailable.png";

  const { data, listing } = props;
  const vin = listing?.vin;
  const { metadata } = data;
  const { make, model, modelYear } = metadata;

  const imgName = listing?.photo?.filename ?? null;
  const img = imgName
    ? `http://localhost:3001/images/${imgName}`
    : fallbackImage;
  const imageOnError = !imgName
    ? null
    : (e) => {
        e.target.src = fallbackImage;
        e.onerror = null;
      };

  const key = `search-${
    vin !== undefined ? vin : `${modelYear}-${make}-${model}`
  }`;

  const isForSale = listing != null && !!Object.keys(listing).length;

  return (
    <>
      <Card className="search-card">
        <Row>
          <Col>
            <Card.Img
              variant="top"
              className="vertically-center"
              src={img}
              alt={`${make} ${model} ${modelYear}`}
            />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>
                {make} {model} {modelYear}
              </Card.Title>
              <Card.Text>
                {isForSale ? (
                  <ListingDetails listing={listing} />
                ) : (
                  "Not currently listed for sale"
                )}
              </Card.Text>
              <LinkContainer
                to={{
                  pathname: "/safety",
                  state: {
                    make,
                    model,
                    year: modelYear,
                  },
                }}
              >
                <Button size="sm" variant="primary" className="mr-2">
                  Safety Info
                </Button>
              </LinkContainer>
              <LinkContainer to={`/listing/${listing._id}`}>
                <Button size="sm" variant="primary">
                  View Listing
                </Button>
              </LinkContainer>
            </Card.Body>
          </Col>
        </Row>
        <SingleVehicleMap listing={listing} zoomLevel={15} />
      </Card>
      {/* <div key={key} className="card">
        <img
          className="img-responsive mx-2 px-2"
          src={img}
          alt="Vehicle"
          onError={imageOnError}
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
      </div> */}
    </>
  );
};

const ListingDetails = (props) => {
  const { listing } = props;
  const { vin, exteriorColor, interiorColor, millage, price } = listing;
  listing.location.coordinateArray = listing.location;

  const key = `listing-${vin}`;
  return (
    <div className="flex flex-col content-around" key={key}>
      <Badge bg="danger">For Sale</Badge>
      
      <p className="price">Price: {price}</p>
      <div>
        <span>VIN: {vin} </span>
        <span className="flex content-between">
          {" "}
          <span> Millage {millage}</span>
        </span>
        <span className="flex content-between">
          {" "}
          Colors: <span> Exterior {exteriorColor} </span>{" "}
          <span>Interior {interiorColor} </span>
        </span>
      </div>
    </div>
  );
};

export default SearchCard;
