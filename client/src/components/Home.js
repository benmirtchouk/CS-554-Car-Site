import React from "react"; // useContext
// import { AuthContext } from "./firebase/Auth";
import Sidebar from "./sidebars/Sidebar";

const Home = () => {
  // const { currentUser } = useContext(AuthContext);
  const slinks = [
    {
      name: "Recent Sales",
      link: "/recent_sales",
    },
  ];

  // if (currentUser) {
  //   console.log(`currentUser: ${currentUser.uid}`);
  //   // console.log(currentUser);
  // }

  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>Home</h1>
        <br />
        <br />
        <p>This is the Home page.</p>
      </div>
    </div>
  );
};

export default Home;
