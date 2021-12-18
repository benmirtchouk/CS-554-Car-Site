import React, { useState } from "react";
import { listing, geocode } from "../../data";
import CarD from "../CarD";
import SingleVehicleMap from "../MapLogic/SingleVehicleMap";

const AddListing = () => {
  const [errors, setErrors] = useState([]);
  const [createdListing, setCreatedListing] = useState(null);
  const [geocodedData, setGeoCodedData] = useState(null);
  const [geocodeDataLoading, setGeocodeDataLoading] = useState(false);

  const uploadListing = async (newListing, e) => {
    const { data, status } = await listing.addListing(newListing);
    console.log(data);
    if (status >= 200 && status < 300) {
      setCreatedListing({ data: { metadata: data.metadata }, listing: data });
      e.target.reset();
      setErrors([]);
      setGeoCodedData(null);
    } else if (status === 413) {
      setErrors(["Image is too large!"]);
    } else if (status >= 400 && status < 600 && data.message) {
      setErrors([data.message]);
    } else {
      setErrors(["Failed to create listing"]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setCreatedListing(null);
    if (geocodeDataLoading) {
      setErrors([
        "Cannot submit form while Geocoded address is being looked up!",
      ]);
      return;
    }
    const { lat, lon } = geocodedData;
    const newListing = {
      exteriorColor: e.target.elements.exteriorColor.value,
      interiorColor: e.target.elements.interiorColor.value,
      coordinates: [lon, lat],
      millage: e.target.elements.millage.value,
      price: e.target.elements.price.value,
      vin: e.target.elements.vin.value,
    };

    const file = e.target.elements.photo.files[0];

    if (!file) {
      await uploadListing(newListing, e);
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      /// Courtesy validation for 800kb. Server does *not* directly validate image size, but *does* validate total request payload size.
      const maxSizeBytes = 800 * 1024;
      if (file.size >= maxSizeBytes) {
        setErrors(["File must be smaller than 800kb"]);
        e.target.elements.photo.value = "";
        return;
      }
      newListing.photo = reader.result;
      uploadListing(newListing, e);
    };
  };

  const geocodeAddress = async (e) => {
    e.preventDefault();
    const address = e.target.value.trim();
    if (address === geocodedData?.searchedTerm || address.length === 0) {
      return;
    }
    setGeocodeDataLoading(true);
    setGeoCodedData(null);
    setCreatedListing(null);

    const { data, status } = await geocode.geocodeAddress(address);
    if (status >= 400 || data.length === 0) {
      setErrors(["Failed to geocode address"]);
    } else {
      const { location, displayName } = data;
      setErrors([]);
      setGeoCodedData({
        lat: location[1],
        lon: location[0],
        displayName,
        searchedTerm: address,
      });
    }

    setGeocodeDataLoading(false);
  };

  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>Add a Listing</h1>
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={submitHandler}>
          <div className="form-group flex-col">
            <label>
              Vin
              <input
                id="vin"
                type="text"
                name="vin"
                placeholder="Vin..."
                className="mx-2"
                title="The full VIN of the vehicle"
                required
              />
            </label>

            <label>
              Street Address
              <input
                id="streetAddress"
                type="text"
                name="streetAddress"
                placeholder="Street address of vehicle"
                title="Where is the vehicle located?"
                onBlur={geocodeAddress}
                disabled={geocodeDataLoading}
                required
              />
            </label>
            <label>
              Price
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Price..."
                className="mx-2"
                title="The list price to show"
                required
              />
            </label>
            <label>
              Millage
              <input
                id="millage"
                type="number"
                name="millage"
                placeholder="Millage..."
                className="mx-2"
                title="The millage on the odometer"
                required
              />
            </label>
            <label>
              Exterior Color
              <input
                id="exteriorColor"
                type="text"
                name="exteriorColor"
                placeholder="Exterior Color..."
                className="mx-2"
                title="The primary exterior color"
                required
              />
            </label>
            <label>
              Interior Color
              <input
                id="interiorColor"
                type="text"
                name="interiorColor"
                placeholder="Interior Color..."
                className="mx-2"
                title="The primary interior color"
                required
              />
            </label>

            <label>
              Photo
              <input
                id="photo"
                type="file"
                name="photo"
                accept=".png,.jpg,.jpeg, image/png, image/jpg, image/.jpeg"
                title="Optional photo of the vehicle"
              />
            </label>
          </div>

          <button className="btn-primary px-10" type="submit" name="submitBtn">
            Add Listing
          </button>
        </form>
        <div className="errors">
          {errors.map((error) => (
            <p className="error" key={error}>
              {error}
            </p>
          ))}
        </div>
        {geocodedData?.displayName ? (
          <span>
            This vehicle is at {geocodedData.displayName}
            <br />
            <SingleVehicleMap
              listing={{
                location: [geocodedData.lon, geocodedData.lat],
              }}
              zoomLevel="15"
            />
          </span>
        ) : (
          ""
        )}

        {createdListing ? (
          <div>
            Created <br />
            {CarD(createdListing)}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddListing;
