import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SingleVehicleMap from "../MapLogic/SingleVehicleMap";
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
    setLoading(true);

    const { data, status } = await listing.getListing(id);

    if (Math.floor(status / 100) === 2 && data) {
      setListingData(data);
      setErrorCode(undefined);
      setErrorMessage(undefined);
    } else {
      setErrorCode(status);
      setErrorMessage(data?.message);
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

  if (loading) {
    return <Loading />;
  }
  if (errorMessage) {
    return <ListError info={{ errorCode, errorMessage }} />;
  }

  console.log(listingData);
  return (
    <div className="single-listing">
      <dl>
        <div>
          <dt>exteriorColor:</dt>
          <dd>{listingData.exteriorColor}</dd>
        </div>
        <div>
          <dt>interiorColor:</dt>
          <dd>{listingData.interiorColor}</dd>
        </div>
        {/* <div>
          <dt>metadata:</dt>
          <dd>{listingData.metadata}</dd>
        </div> */}
        <div>
          <dt>millage:</dt>
          <dd>{listingData.millage}</dd>
        </div>
        {/* <div>
          <dt>photos:</dt>
          <dd>{listingData.photos}</dd>
        </div> */}
        <div>
          <dt>price:</dt>
          <dd>{listingData.price}</dd>
        </div>
        <div>
          <dt>sellerId:</dt>
          <dd>{listingData.sellerId}</dd>
        </div>
        <div>
          <dt>vin:</dt>
          <dd>{listingData.vin}</dd>
        </div>
        <Button {...{ disabled: listingData.sold }} onClick={buyCar}>
          {listingData.sold ? "Already sold" : "Buy this car"}
        </Button>
      </dl>
      <SingleVehicleMap listing={listingData} zoomLevel="13" />
    </div>
  );
};

export default Listing;
