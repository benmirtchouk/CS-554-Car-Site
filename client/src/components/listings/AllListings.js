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

  const getAveragePosition = (positions) => {
    const sm = positions.reduce((cur, pos) => [cur[0]+pos[0], cur[1]+pos[1]], [0, 0]);
    return [sm[0] / positions.length, sm[1] / positions.length];
  }

  if (loading) {
    return <Loading />;
  }
  console.log(listings);
  return (
    <div className="main_layout">
      <h1>Listings</h1>
      <br />
      <div className="all_listings_map">
        { listings.length !== 0 && (
          <MapContainer className="mapcontainer" center={getAveragePosition(listings.map(ls => ls.location.coordinateArray))} zoom={4} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

            { listings.map(ls => (
              <Marker position={ls.location.coordinateArray}>
                <Popup>
                  A simple popup!
                </Popup>
              </Marker>
            )) }
          </MapContainer>
        ) }
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
