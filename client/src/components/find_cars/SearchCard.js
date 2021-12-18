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
    <Card className="search-card" key={key}>
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
            <Row>
              <Col>
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
                  <Button size="sm" variant="primary" className="w-108 hortizontally-center">
                    Safety Info
                  </Button>
                </LinkContainer>
              </Col>
              <Col>
                <LinkContainer to={`/listing/${listing._id}`}>
                  <Button size="sm" variant="primary" className="w-108 hortizontally-center">
                    View Listing
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
      <SingleVehicleMap listing={listing} zoomLevel={15} />
    </Card>
  );
};

const ListingDetails = (props) => {
  const { listing } = props;
  const { exteriorColor, interiorColor, millage, price } = listing;
  listing.location.coordinateArray = listing.location;

  return (
    <>
      <Row>
        <Col md={4}>
          <Badge bg="danger">For Sale</Badge>
        </Col>
        <Col>
          <p className="price">Price: {price}</p>
        </Col>
      </Row>
      <Row>
        <Col>Millage: {millage}</Col>
        <Col>
          Exterior: <p className="ellipsis">{exteriorColor}</p>
        </Col>
        <Col>
          Interior: <p className="ellipsis">{interiorColor}</p>
        </Col>
      </Row>
    </>
  );
};

export default SearchCard;
