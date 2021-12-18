import React, { useEffect, useState } from "react";
import { listing } from "../../data";
import SearchCard from "../find_cars/SearchCard";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const RecentListings = () => {
  const [recentListings, setRecentListings] = useState([]);
  const [selectedChartStat, setSelectedChartStat] = useState(undefined);

  useEffect(() => {
    (async () => {
      const { data, status } = await listing.getRecentListings(10);
      if (status >= 400 || !data) {
        alert("Failed to get listings");
        return;
      }

      const { listings } = data;
      setRecentListings(
        listings.map((e) => ({ data: { metadata: e.metadata }, listing: e }))
      );
    })();
  }, []);

  console.log(recentListings);
  const recentlyListedCards = recentListings.map((e) => SearchCard(e));
  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>Recent Listings</h1>
        <br /> <br />
        <p>Maybe one of these gems is your next vehicle!</p>
        <br /> <br />
        <select onChange={(e) => setSelectedChartStat(e.target.value)}>
          <option value="price">Price</option>
          <option value="millage">Millage</option>
        </select>
        {selectedChartStat !== undefined && (
          <BarChart
            width={600}
            height={300}
            data={recentListings.map((car) => ({
              name: car.listing.metadata.make,
              uv: car?.listing[selectedChartStat],
            }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" barSize={30} fill="#8884d8" />
          </BarChart>
        )}
        {recentlyListedCards}
      </div>
    </div>
  );
};

export default RecentListings;
