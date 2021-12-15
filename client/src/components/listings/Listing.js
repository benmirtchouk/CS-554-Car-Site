import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

const Listing = (props) => {
  const { listing } = props;
  console.log(listing);
  // exteriorColor: "Blue"
  // interiorColor: "Black"
  // location: {longitude: 40.7468708, latitude: -74.0280354, coordinateArray: Array(2), coordinateJson: {…}, type: 'Point', …}
  // metadata: {make: 'JEEP', model: 'Grand Cherokee', manufacturer: 'FCA US LLC', nullableStringKeys: Array(3), bodyClass: 'Sport Utility Vehicle (SUV)/Multi-Purpose Vehicle (MPV)', …}
  // millage: 92000
  // photos: []
  // price: 9210.5
  // sellerId: "NLBCVA3CMqY6pHht47tS0JKTasa2"
  // vin: "1J4
  const position = [51.505, -0.09];

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
          <dt>millage:</dt>
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
      </dl>
      <MapContainer className="mapcontainer" center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A simple popup!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Listing;
