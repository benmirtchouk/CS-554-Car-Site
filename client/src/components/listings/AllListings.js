import React, { useEffect, useState } from "react";
import { listing } from "../../data";
import Loading from "../Loading";
import VehicleMap from "../MapLogic/VehicleMap";
import Pagination from "../Pagination";
import Listing from "./ListingCard";

const AllListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(null);
  const [listingsPerPage, setListingsPerPage] = useState(10);

  const offset = page * listingsPerPage;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data, status } = await listing.getAllListings(
        listingsPerPage,
        offset
      );

      setTotalSize(data.pagination.totalCount);

      if (Math.floor(status / 100) === 2 && data) {
        setListings(data.results);
      }

      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, listingsPerPage]);

  const getAveragePosition = (positions) => {
    const sm = positions.reduce(
      (cur, pos) => [cur[0] + pos[0], cur[1] + pos[1]],
      [0, 0]
    );
    return [sm[0] / positions.length, sm[1] / positions.length];
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main_layout">
      <h1>Listings</h1>
      <br />
      <Pagination
        currentPage={page}
        pageSize={listingsPerPage}
        setPageSize={setListingsPerPage}
        goToPage={setPage}
        totalSize={totalSize}
      />
      <div className="all_listings_map">
        {listings.length !== 0 && (
          <VehicleMap
            listings={listings}
            center={getAveragePosition(
              listings.map((ls) => ls.location.coordinateArray)
            )}
            zoomLevel='4'
          />
        )}
      </div>
      {listings.map((ls) => (
        <Listing listing={ls} key={ls._id} />
      ))}
    </div>
  );
};

export default AllListings;
