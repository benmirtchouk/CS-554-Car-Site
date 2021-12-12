/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import Searches from "../../data/search";
import SearchCard from "./SearchCard";

const SearchResults = (props) => {
  const [searchResults, setSearchResults] = useState([]);
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
        data.vin = query
        resultsToSet = [{ data, listing: null }];
      } else {
        const { data } = await Searches.byComponents(query);
        resultsToSet = data.map((e) => ({
          data: { metadata: e.metadata },
          listing: e,
        }));
      }

      setSearchResults(Array.isArray(resultsToSet) ? resultsToSet : []);
    })();
  }, [state]);

  const tempDivs = searchResults.map((e) => SearchCard(e));
  return (
    <div className="main_layout">
      <div className="mainbody">
        {searchResults.length ? tempDivs : `No results for search term`}
      </div>
    </div>
  );
};

export default SearchResults;
