import React, { useEffect, useState } from "react";
import { listing } from "../../data";
import CarD from "../CarD";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const RecentListings = () => {
  const [recentListings, setRecentListings] = useState([]);
  const [selectedChartStat, setSelectedChartStat] = useState("price");

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
  const recentlyListedCards = recentListings.map((e) => CarD(e));
  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>Recent Listings</h1>
        <br /> <br />
        <p>Maybe one of these gems is your next vehicle!</p>
        <br /> <br />
        <select onChange={(e) => setSelectedChartStat(e.target.value)}>
          <option value="price">Price</option>
          <option value="millage">Mileage</option>
        </select>
        {selectedChartStat !== undefined && (
          <LineChart
            width={600}
            height={300}
            data={recentListings.map((car) => ({
              time: new Date(car.listing.createdOn).getTime(),
              uv: car?.listing[selectedChartStat],
            }))}
          >
            <XAxis dataKey="time" tickFormatter = {(unixTime) => new Date(unixTime).toLocaleDateString("en-US", {hour: 'numeric', minute: 'numeric'})} />
            <YAxis />
            <Line dataKey="uv" barSize={30} fill="#8884d8" />
          </LineChart>
        )}
        {recentlyListedCards}
      </div>
    </div>
  );
};

export default RecentListings;
