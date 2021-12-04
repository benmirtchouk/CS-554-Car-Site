import React, { useEffect } from "react";
import "../../App.css";
import "../../Carigs.css";
import Sidebar from "../sidebars/Sidebar";
import { nhtsa } from "../../data";

const FindByVin = () => {
  const slinks = [
    { name: "Find by Model", link: "/find_by_model" },
    { name: "Find by Make", link: "/find_by_make" },
    { name: "Find by Year", link: "/find_by_year" },
  ];

  useEffect(() => {
    async function test() {
      const { data, status } = await nhtsa.decodeVin("5UXWX7C5*BA");
      console.log("got", status, data);
    }

    test();
  }, []);

  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>Find Car by Vin</h1>
        <br />
        <br />
        <p>This is the Find Car by Vin page.</p>
      </div>
    </div>
  );
};

export default FindByVin;
