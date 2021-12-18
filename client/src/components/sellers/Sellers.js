import React, { useEffect, useState } from "react";
import { seller } from "../../data";
import SellerCard from "./SellerCard";

const Sellers = () => {

  const [topListedSellers, setTopListedSellers] = useState([]);
  const [highestRatedSellers, setHighestRatedSellers] = useState([]);

  useEffect(() => {
    ( async () => {
      /// No pagination as this is a scoreboard esc system
      const {data, status} = await seller.getMostListedSellers(10)
      if(status >= 400 || !data) {
        alert("Failed to get top sellers!")
        return;
      }

      setTopListedSellers(data.sellers);
    })()
  }, [])


  useEffect(() => {
    ( async () => {
      const { data, status} = await seller.getHighestRatedSellers(5);
      if(status >= 400 || !data) {
        alert("Failed to get highest rated sellers!")
        return;
      }

      setHighestRatedSellers(data.sellers);
    })()
  }, [])


  const topListedSellersCards = topListedSellers.map(e => <SellerCard key={`topListed-${e._id}`} seller={e} />  )
  const highestRatedSellerCards = highestRatedSellers.map(e => <SellerCard key={`highestRated${e._id}`} seller={e} />)

  return (
  <div className="main_layout">
    <div className="mainbody">
      <h1>Sellers</h1>
      <br />
      <br />
      <br />
      <br />
      <p>This is the Sellers page.</p>

    <div>
      Top ten most active Carigslist sellers
      {topListedSellersCards}
    </div>


    <div>
      The best sellers to buy from!
      {highestRatedSellerCards}
    </div>

    </div>
  </div>
  )
};

export default Sellers;
