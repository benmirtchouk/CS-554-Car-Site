/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import Searches from "../../data/search";
import CarD from "../CarD";
import Pagination from "../Pagination";
import Loading from "../Loading";
import VehicleMap from "../MapLogic/VehicleMap";

const mapListing = (listing) => ({
  data: { metadata: listing.metadata },
  listing,
});

const handleLocationSearch = async (
  inputQuery,
  resultsPerPage,
  offset,
  setTotalSize
) => {
  const [lon, lat] = inputQuery.location;
  const query = {
    limit: resultsPerPage,
    offset,
    longitude: lon,
    latitude: lat,
    radius: 25,
    units: "miles",
  };

  const searchData = await Searches.byLocation(query);
  const { pagination, results } = searchData.data;
  if (searchData.status >= 400) {
    return [];
  }

  setTotalSize(pagination.totalCount);
  return results.map(mapListing);
};

const handleComponentSearch = async (
  inputQuery,
  setTotalSize,
  resultsPerPage,
  offset
) => {
  const query = {
    ...inputQuery,
    limit: resultsPerPage,
    offset,
  };

  const { data } = await Searches.byComponents(query);
  const { pagination, results } = data;
  setTotalSize(pagination.totalSize);
  return results.map(mapListing);
};

const SearchResults = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(null);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const offset = page * resultsPerPage;

  const {
    location: { state },
  } = props;

  useEffect(() => {
    (async () => {
      if (state === undefined) {
        return;
      }
      const { searchKey, query } = state;

      let resultsToSet = [];
      if (searchKey === "vin") {
        const { data } = await Searches.byVin(query);
        setTotalSize(0);
        if (!data?.metadata?.modelId) {
          resultsToSet = [];
        } else {
          data.vin = query;
          resultsToSet = [
            { data: { metadata: data.metadata }, listing: data.listing },
          ];
        }
      } else if (query === undefined || query === null) {
        return;
      } else if (searchKey === "location") {
        resultsToSet = await handleLocationSearch(
          query,
          resultsPerPage,
          offset,
          setTotalSize
        );
      } else {
        resultsToSet = await handleComponentSearch(
          query,
          setTotalSize,
          resultsPerPage,
          offset
        );
      }

      const resultsAreArray = Array.isArray(resultsToSet);
      if (resultsAreArray) {
        setSearchResults([]);
      }
      setSearchResults(resultsAreArray ? resultsToSet : []);
      setLoading(!resultsAreArray);
    })();
  }, [state, offset, resultsPerPage]);

  if (state === undefined) {
    return <div> Please enter a search term</div>;
  }
  if (loading) {
    return <Loading />;
  }

  const searchCards = searchResults.map((e) => {
    console.log(e)
    return CarD(e);
  });
  return (
    <div className="main_layout">
      <div className="mainbody">
        {totalSize > 1 ? (
          <Pagination
            currentPage={page}
            pageSize={resultsPerPage}
            setPageSize={setResultsPerPage}
            goToPage={setPage}
            totalSize={totalSize}
          />
        ) : (
          ""
        )}

        {searchResults.length > 1 ? (
          <VehicleMap
            listings={searchResults.map((e) => e.listing)}
            center={[
              searchResults[0].listing.location[1],
              searchResults[0].listing.location[0],
            ]}
            zoomLevel={"4"}
            className="search-map search-card"
          />
        ) : (
          ""
        )}

        {searchResults.length ? searchCards : `No results for search term`}
        {totalSize > 1 ? (
          <Pagination
            currentPage={page}
            pageSize={resultsPerPage}
            setPageSize={setResultsPerPage}
            goToPage={setPage}
            totalSize={totalSize}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchResults;
