/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import Searches from "../../data/search";
import SearchCard from "./SearchCard";
import Pagination from "../Pagination";
import Loading from "../Loading";
import { geocode } from "../../data";

const SearchResults = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(null);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [cachedQuery, setCachedQuery] = useState(null);

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
      if(cachedQuery && searchKey !== cachedQuery.searchKey) {
        setCachedQuery(null);
        setPage(0);
        setTotalSize(1);
      }

      let resultsToSet = [];
      if (searchKey === "vin") {
        const { data } = await Searches.byVin(query);
        setTotalSize(0);
      } else if (query === undefined || query === null) {
        return;
      } else if (searchKey === "location") {
        const enteredLocation = query.location;
        if (!enteredLocation && !cachedQuery) {
          return;
        }
        /// If the user has entered a location, reset the pagination offset for the new query
        if (enteredLocation) {
          setPage(0);
        }
        const geoCodeSearch = enteredLocation
          ? await geocode.geocodeAddress(enteredLocation)
          : { data: cachedQuery.geocodedData, status: 200 };

        const { data, status } = geoCodeSearch;

        if (status >= 400 || !data) {
          resultsToSet = [];
        } else {
          delete query.location;
          const { lat, lon } = data[0];
          query.limit = resultsPerPage;
          query.offset = offset;
          query.longitude = lon;
          query.latitude = lat;
          query.radius = 25;
          query.units = "miles";
          query.limit = resultsPerPage;
          query.offset = offset;
          const searchData = await Searches.byLocation(query);
          const { pagination, results } = searchData.data;
          setTotalSize(pagination.totalCount);
          setCachedQuery({
            searchKey,
            geocodedData: data,
          });
          resultsToSet = results.map((e) => ({
            data: { metadata: e.metadata },
            listing: e,
          }));
        }
      } else {
        query.limit = resultsPerPage;
        query.offset = offset;
        const { data } = await Searches.byComponents(query);
        const { pagination, results } = data;
        setTotalSize(pagination.totalSize);
        setCachedQuery({
          searchKey
        })
        resultsToSet = results.map((e) => ({
          data: { metadata: e.metadata },
          listing: e,
        }));
      }

      const resultsAreArray = Array.isArray(resultsToSet); 
      setSearchResults(resultsAreArray ? resultsToSet : []);
      setLoading(!resultsAreArray);
    })();
  }, [state, offset, resultsPerPage, cachedQuery]);

  if (state === undefined) {
    return <div> Please enter a search term</div>;
  }
  if (loading) {
    return <Loading />;
  }

  const searchCards = searchResults.map((e) => SearchCard(e));
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

        {searchResults.length ? searchCards : `No results for search term`}
      </div>
    </div>
  );
};

export default SearchResults;
