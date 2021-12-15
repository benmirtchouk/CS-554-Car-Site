import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { listing } from "../../data";
import Loading from "../Loading";
import Listing from "./Listing";

const AllListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data, status } = await listing.getAllListings();

      if (Math.floor(status/100) === 2 && data) {
        setListings(data);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main_layout">
      <h1>Listings</h1>
      <br />
      <div className="all_listings_map">
        <MapContainer className="mapcontainer" center={[42, 43]} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          
          { [...Array(10).keys()].map(i => 
              [...Array(10).keys()].map(j => 
            <Marker position={[42 + i/10, 43 + j/10]}>
              <Popup>
                A simple popup!
              </Popup>
            </Marker>
          )) }
          
        </MapContainer>
      </div>
      {
        listings.map(ls => (
          <Listing listing={ls} key={ls.vin} />
        ))
      }
    </div>
  );
};

export default AllListings;
