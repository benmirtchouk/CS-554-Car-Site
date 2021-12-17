import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

const Listing = (props) => {
  const { listing } = props;
  console.log(listing);
  
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
      <MapContainer className="mapcontainer" center={listing.location.coordinateArray} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={listing.location.coordinateArray}>
          <Popup>
            A {listing.metadata.modelYear} {listing.metadata.make} {listing.metadata.model} <br /> {listing.vin}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Listing;
