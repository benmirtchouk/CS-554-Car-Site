import React, { useEffect, useState } from "react";
import { listing } from "../../data";
import Loading from "../Loading";
import Listing from "./Listing";

const MyListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data, status } = await listing.getUserListings();

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
      {
        listings.map(ls => (
          <Listing listing={ls} key={ls.vin} />
        ))
      }
    </div>
  );
};

export default MyListings;
