import React, { useEffect } from "react"; // useContext
import { Link } from "react-router-dom";

const Home = ({ setSidebar }) => {
  useEffect(() => {
    setSidebar([
      {
        name: "Recent Sales",
        link: "/recent_sales",
      },
      {
        name: "Recent Purchases",
        link: "/recent_purchases",
      },
      {
        name: "Recent Orders",
        link: "/recent_orders",
      },
    ]);
  }, [setSidebar]);

  return (
    <>
      <h1>Home</h1>
      <main>
        <section>
          Welcome to Carigslist! Carigslist is a marketplace to buy and sell
          vehicles directly from other people.
        </section>
        <h2> Getting Started</h2>
        To look at vehicles for sale, there is a search bar at the top of page
        to allow easy access. If you are interested in{" "}
        <Link to="add_listing">selling a vehicle you can go here</Link> to list
        a vehicle for sale.
      </main>
    </>
  );
};
export default Home;
