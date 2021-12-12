import React, { useEffect } from "react";
import "../../App.css";
import "../../Carigs.css";
import { nhtsa } from "../../data";

const FindByVin = () => {
  useEffect(() => {
    async function test() {
      const { data, status } = await nhtsa.decodeVin("5UXWX7C5*BA");
      console.log("got", status, data);
    }

    test();
  }, []);

  return (
    <div className="main_layout">
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
