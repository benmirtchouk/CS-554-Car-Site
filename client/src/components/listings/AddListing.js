import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
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
        <Form className="form-page" onSubmit={submitHandler}>
          <Row>
            <Col>
              <h1>Add a Listing</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>VIN</Form.Label>
                <Form.Control
                  id="vin"
                  type="text"
                  name="vin"
                  placeholder="Vin..."
                  title="The full VIN of the vehicle"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  id="streetAddress"
                  type="text"
                  name="streetAddress"
                  placeholder="Street address of vehicle..."
                  title="Where is the vehicle located?"
                  onBlur={geocodeAddress}
                  disabled={geocodeDataLoading}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inlineFormInputGroup">Price</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text>$</InputGroup.Text>
                  <FormControl
                    type="number"
                    name="price"
                    placeholder="Price..."
                    title="The list price to show"
                    required
                    id="inlineFormInputGroup"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inlineFormInputGroup">Mileage</Form.Label>
                <Form.Control
                  id="millage"
                  type="number"
                  name="millage"
                  placeholder="Millage..."
                  title="The mileage on the odometer"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Exterior Color</Form.Label>
                <Form.Control
                  id="exteriorColor"
                  type="text"
                  name="exteriorColor"
                  placeholder="Exterior Color..."
                  title="The primary exterior color"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Interior Color</Form.Label>
                <Form.Control
                  id="interiorColor"
                  type="text"
                  name="interiorColor"
                  placeholder="Interior Color..."
                  title="The primary interior color"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  id="photo"
                  type="file"
                  name="photo"
                  accept=".png,.jpg,.jpeg, image/png, image/jpg, image/.jpeg"
                  title="Optional photo of the vehicle"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Add Listing
              </Button>
            </Col>
          </Row>
        </Form>
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
  );
};

export default AddListing;
