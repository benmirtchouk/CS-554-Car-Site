/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import Sidebar from "../sidebars/Sidebar";
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
        /// TODO normalize response between listing and general vin
        const { data } = await Searches.byVin(query);
        resultsToSet = [data];
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
      <Sidebar />
      <div className="mainbody">
        {searchResults.length ? JSON.stringify(searchResults) : ""};
        {searchResults.length ? tempDivs : ""};
      </div>
    </div>
  );
};

export default SearchResults;
