/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  Button,
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
} from "react-bootstrap";
import { geocode } from "../../data";


const parseSearchQuery = (searchText) => {
  const tokens = searchText.split(" ").filter((e) => e !== "");
  switch (tokens.length) {
    case 1:
      return {
        // eslint-disable-next-line no-restricted-globals
        [isFinite(tokens[0]) ? "year" : "eitherMakeModel"]: tokens[0],
      };

    case 2: // <Year> <Make or Model> or <Make> <Model> TODO: <Make or Model> <Year> ?
      // eslint-disable-next-line no-restricted-globals
      if (isFinite(tokens[0])) {
        return {
          year: tokens[0],
          eitherMakeModel: tokens[1],
        };
      }
      return {
        make: tokens[0],
        model: tokens[1],
      };
    case 3: // <Year> <Make> <Model>
      // eslint-disable-next-line no-restricted-globals
      if (!isFinite(tokens[0])) {
        /// TODO Show Error
        return null;
      }

      return {
        year: tokens[0],
        make: tokens[1],
        model: tokens[2],
      };
    default:
      return null;
  }
};

/// Note: There can only be one Search form visible on the screen at the time, or ids will be duplicated.
const MiniVehicleSearchForm = () => {
  const [searchKey, setSearchKey] = useState(null);
  const history = useHistory();

  const carSearchHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const searchText = form.elements[0].value;

    const query = {};
    if (searchText.length === 0) {
      return;
    }

    if (typeof searchKey !== "string") {
      query.searchKey = "components";
      query.query = parseSearchQuery(searchText);
    } else if (searchKey === "location") {
      const {data, status} = await geocode.geocodeAddress(searchText);
      if(status > 400 || !data) {
        return; 
      }

      query.searchKey = searchKey;
      query.query = { [searchKey]: data.location };

    } else {
      query.searchKey = searchKey;
      query.query =
        searchKey === "vin" ? searchText : { [searchKey]: searchText };
    }

    history.push({ pathname: "/search_results", state: query });
  };

  return (
    <Form className="d-flex" onSubmit={carSearchHandler}>
      <InputGroup className="d-flex">
        <FormControl
          className="placeholder-gray-500"
          placeholder="Find a Car"
          id="mini-vehicle-search-form"
        />
        <label
          htmlFor="mini-vehicle-search-form"
          className="screen-reader-only-label"
        >
          Search for:
        </label>
        <DropdownButton
          variant="secondary"
          className="capitalize"
          title={typeof searchKey === "string" ? searchKey : "Find By"}
          id="input-group-dropdown-2"
          align="end"
          onSelect={(e) => setSearchKey(e !== "freeform" ? e : null)}
        >
          <Dropdown.Item href="#" eventKey="make">
            Make
          </Dropdown.Item>
          <Dropdown.Item href="#" eventKey="model">
            Model
          </Dropdown.Item>
          <Dropdown.Item href="#" eventKey="year">
            Year
          </Dropdown.Item>
          <Dropdown.Item href="#" eventKey="vin">
            VIN
          </Dropdown.Item>
          <Dropdown.Item href="#" eventKey="location">
            Location
          </Dropdown.Item>
          <Dropdown.Item href="#" eventKey="freeform">
            Freeform
          </Dropdown.Item>
        </DropdownButton>
        <Button type="submit" variant="primary" id="search">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MiniVehicleSearchForm;
