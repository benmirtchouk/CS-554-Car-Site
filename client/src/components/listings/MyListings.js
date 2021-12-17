import React, { useEffect, useState } from "react";
import { listing } from "../../data";
import Loading from "../Loading";
import Listing from "./ListingCard";
import Pagination from "../Pagination";

const MyListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(null);
  const [listingsPerPage, setListingsPerPage] = useState(10);

  const offset = page * listingsPerPage;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data, status } = await listing.getUserListings(
        listingsPerPage,
        offset
      );

      if (Math.floor(status/100) === 2 && data) {
        setTotalSize(data.pagination.totalCount);
        setListings(data.results);
      }

      setLoading(false);
    }
    fetchData();
  }, [listingsPerPage, offset]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main_layout">
      <h1>Listings</h1>
      <Pagination
        currentPage={page}
        pageSize={listingsPerPage}
        setPageSize={setListingsPerPage}
        goToPage={setPage}
        totalSize={totalSize}
      />
      <br />
      {
        listings.map(ls => (
          <Listing listing={ls} key={ls._id} />
        ))
      }
    </div>
  );
};

export default MyListings;
