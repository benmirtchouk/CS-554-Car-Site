import React, { useEffect, useState } from "react";
import { listing } from "../../data";
import CarD from "../CarD";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const RecentSales = () => {
  const [recentSales, setRecentSales] = useState([]);
  const [selectedChartStat, setSelectedChartStat] = useState("price");

  useEffect(() => {
    (async () => {
      const { data, status } = await listing.getRecentSales(10);
      if (status >= 400 || !data) {
        alert("Failed to get listings");
        return;
      }

      const { listings } = data;
      setRecentSales(
        listings.map((e) => ({ data: { metadata: e.metadata }, listing: e }))
      );
    })();
  }, []);

  console.log(recentSales);
  const recentlySoldCards = recentSales.map((e) => CarD(e));
  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>Recent Sales</h1>
        <br /> <br />
        Congratulations to all these lucky new owners!
        <br /> <br />
        <select onChange={(e) => setSelectedChartStat(e.target.value)}>
          <option value="price">Price</option>
          <option value="millage">Mileage</option>
        </select>
        {selectedChartStat !== undefined && (
          <BarChart
            width={600}
            height={300}
            data={recentSales.map((car) => ({
              name: car.listing.metadata.make,
              uv: car?.listing[selectedChartStat],
            }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" barSize={30} fill="#8884d8" />
          </BarChart>
        )}
        <div>{recentlySoldCards}</div>
      </div>
    </div>
  );
};

export default RecentSales;
