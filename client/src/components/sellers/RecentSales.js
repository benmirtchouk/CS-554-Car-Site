import React, { useEffect, useState } from "react";
import { listing } from "../../data";
import SearchCard from "../find_cars/SearchCard";

const RecentSales = () => {

  const [recentSales, setRecentSales] = useState([]);

  useEffect( () => {
    (async () => {
      const {data, status } = await listing.getRecentSales(10);
      if(status >= 400 || !data) {
        alert("Failed to get listings");
        return;
      }

      const { listings } = data;
      setRecentSales(listings.map(e => ({  data: { metadata: e.metadata },
        listing: e})));
    })()
  }, [])


  const recentlySoldCards = recentSales.map(e => SearchCard(e))
  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>Recent Sales</h1>
        <br />
        <br />
        <p>This is the Recent Sales page.</p>

        <div>
          Congratulations to all these new owners!
          {recentlySoldCards}
        </div>
      </div>
  </div>
  )
}
 


export default RecentSales;
