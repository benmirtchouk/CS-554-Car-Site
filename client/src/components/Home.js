import React, { useEffect } from "react"; // useContext

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
      <br />
      <br />
      <p>This is the Home page.</p>
    </>
  );
};
export default Home;
