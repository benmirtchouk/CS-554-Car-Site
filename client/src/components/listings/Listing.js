import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import SingleVehicleMap from "../MapLogic/SingleVehicleMap";
import { Container, Row, Col, Table } from "react-bootstrap";
import { listing } from "../../data";
import Loading from "../Loading";
import ListError from "../ListError";

const Listing = (props) => {
  const [loading, setLoading] = useState(true);
  const [listingData, setListingData] = useState(undefined);
  const [errorCode, setErrorCode] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const {
    match: {
      params: { id },
    },
  } = props;

  const fetchData = async () => {
    console.log("fetchData");
    setLoading(true);

    const { data, status } = await listing.getListing(id);
    console.log(data, status);

    if (Math.floor(status / 100) === 2 && data) {
      setListingData(data);
      setErrorCode(undefined);
      setErrorMessage(undefined);
    } else {
      setErrorCode(status);
      setErrorMessage(data?.message ?? "No message returned");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const buyCar = async () => {
    console.log("buy");
    const { data, status } = await listing.buyListing(id);
    console.log(data, status);
    await fetchData();
  };

  const fallbackImage = "/images/ImgNotAvailable.png";
  const imgName = listingData?.photo?.filename ?? null;
  console.log(imgName);
  const img = imgName
    ? `http://localhost:3001/images/${imgName}`
    : fallbackImage;

  if (loading) {
    return <Loading />;
  }
  if (errorMessage) {
    return <ListError info={{ errorCode, errorMessage }} />;
  }

  const { make, model, modelYear } = listingData.metadata;

  return (
    <Container>
      <Row>
        <Col>
          <img
            className="hortizontally-center full-width pb-4"
            src={img}
            alt={`${make} ${model} ${modelYear}`}
          />
        </Col>
        <Col>
          <h1>
            {make} {model} {modelYear}
          </h1>
          <h2 className="red-text">${listingData.price}</h2>
          <ReactStars
            edit={false}
            count={5}
            size={24}
          />
          <Button {...{ disabled: listingData.sold }} onClick={buyCar}>
            {listingData.sold ? "Sold" : "Buy"}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <tbody>
              <tr>
                <td>Exterior Color</td>
                <td>{listingData.exteriorColor}</td>
              </tr>
              <tr>
                <td>Interior Color</td>
                <td>{listingData.interiorColor}</td>
              </tr>
              <tr>
                <td>Mileage</td>
                <td>{listingData.millage}</td>
              </tr>
              <tr>
                <td>Seller ID</td>
                <td>{listingData.sellerId}</td>
              </tr>
              <tr>
                <td>VIN</td>
                <td>{listingData.vin}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <SingleVehicleMap listing={listingData} zoomLevel="13" />
        </Col>
      </Row>
    </Container>
  );
};

export default Listing;
