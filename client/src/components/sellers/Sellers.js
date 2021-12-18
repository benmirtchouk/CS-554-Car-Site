import React, { useEffect, useState } from "react";
import { seller } from "../../data";

const Sellers = () => {

  const [topListedSellers, setTopListedSellers] = useState([])

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


  const sellers = topListedSellers.map(e => {
    return (<div>
      <span>{e.firstName} {e.lastName} -- {e.displayName} </span>
      <span> Based in {e.city}, {e.state} </span>
      <span> With a total of {e.totalListings} cars on Carigslist!</span>
    </div>)

  })

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
      {sellers}
    </div>

    </div>
  </div>
  )
};

export default Sellers;
