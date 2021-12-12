import React, { useState } from "react";
import Sidebar from "../sidebars/Sidebar";
import { listing } from "../../data";
import SearchCard from "../find_cars/SearchCard";

const AddListing = () => {
  const [errors, setErrors] = useState([]);
  const [createdListing, setCreatedListing] = useState(null);

  const slinks = [
    { name: "Sell A Car", link: "/sell_car" },
    { name: "Recent Sales", link: "/recent_sales" },
    { name: "Sellers", link: "/sellers" },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    setCreatedListing(null);
    const newListing = {
      exteriorColor: e.target.elements.exteriorColor.value,
      interiorColor: e.target.elements.interiorColor.value,
      coordinates: [
        e.target.elements.longitude.value,
        e.target.elements.latitude.value,
      ],
      millage: e.target.elements.millage.value,
      price: e.target.elements.price.value,
      vin: e.target.elements.vin.value,
    };

    const { data, status } = await listing.addListing(newListing);
    if (status === 200) {
      setCreatedListing({ data: { metadata: data.metadata}, listing: data });
      e.target.reset();
    } else if (status >= 400 && status < 600) {
      setErrors([data.message]);
    } else {
      setErrors(["Failed to create listing"]);
    }
  };

  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>Add a Listing</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <form onSubmit={submitHandler}>
          <div className="form-group flex-col">
            <input id="vin" type="text" name="vin" placeholder="Vin..." required />
            <div id="coordinates" className="form-group flex-row">
              <input id="longitude" type="number" name="longitude" placeholder="Longitude..." step="0.0000001" min="-180" max="180" required />
              <input id="latitude" type="number" name="latitude" placeholder="Latitude..." step="0.0000001" min="-90" max="90" required />
            </div>
            <input id="price" type="number" name="price" placeholder="Price..." required />
            <input id="millage" type="number" name="millage" placeholder="Millage..." required />
            <input id="exteriorColor" type="text" name="exteriorColor" placeholder="Exterior Color..." required />
            <input id="interiorColor" type="text" name="interiorColor" placeholder="Interior Color..." required />
            {/* <input id="photos" type="text" name="photos" placeholder="Photos..." required /> */}
          </div>
          
          <button
            className="btn-primary px-10"
            type="submit"
            name="submitBtn"
          >
            Add Listing
          </button>
          {/* vin: Required, full vin number. Must not currently have a listing
          coordinates: Required, array of form [longitude, latitude] as floats. 
          price: Required, positive float
          millage: Required, positive float
          exteriorColor: Required, any non blank string
          interiorColor: Required, any non blank string
          photos: Array, currently ignored */}
        </form>
        <div className="errors">
          { errors.map(error => (
              <p className="error">{error}</p>
            )) }
        </div>
        {createdListing ? (
          <div>
            Created <br />
            {SearchCard(createdListing)}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddListing;
