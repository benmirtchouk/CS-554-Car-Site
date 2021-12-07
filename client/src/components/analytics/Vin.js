import React, { useState, useEffect } from "react";
import Sidebar from "../sidebars/Sidebar";
import { getShortVin, getPicture } from "../../data/nhtsa";
import "../../App.css";
import "../../Carigs.css";
import Loading from "../Loading";
import ListError from "../ListError";
import Card from "./VinCard";

const Vin = () => {
  const slinks = [{ name: "Safety", link: "/safety" }];

  const [vin, setVin] = useState(undefined);
  const [vinData, setVinData] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function getVehiclePicture(make, model, year) {
    let picture;
    await getPicture(make, model, year)
      .then((result) => {
        if (result.data !== null) {
          picture = result.data;
        }
      })
      .catch((e) => {
        console.log(`problem getting picture, returning undefined - ${e}`);
      });
    return picture;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // alert(`vin entered: ${e.target.elements.vin.value}`);
    setVin(e.target.elements.vin.value);
    e.target.elements.vin.value = "";
  };

  useEffect(() => {
    async function getVinData() {
      setLoading(true);
      if (vin) {
        await getShortVin(vin)
          .then(async (result) => {
            if (result.status !== 200) {
              setApiError(true);
              console.log(
                `Errors Found on return API Call: ${result.errors.message}`
              );
              setErrorCode(`*****API Problem*****`);
              setErrorMessage(result.errors.message);
            } else {
              if (result.data.length < 1) {
                setApiError(true);
                console.log(`No Data Found`);
                setErrorCode(`****404****`);
                setErrorMessage(`No data found `);
              } else {
                setApiError(false);
                // get a picture now for the model/make/year
                const img = await getVehiclePicture(
                  result.data.Make.trim(),
                  result.data.Model.trim(),
                  result.data.ModelYear.trim()
                );
                const vehicle = result.data;
                vehicle.VehiclePicture = img;
                setVinData(vehicle);
                setShowCard(true);
              }
              setLoading(false);
            }
          })
          .catch((e) => {
            setVinData(undefined);
            setApiError(true);
            setErrorCode(`********API Problem***********`);
            setErrorMessage(`Car API Problem: ${e.message}`);
            console.log(e);
          });
      } else setLoading(false);
    }
    getVinData();
  }, [vin]);

  if (apiError) {
    return <ListError info={{ errorCode, errorMessage }} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div key="safety" className="main_layout">
      <Sidebar sideLinks={slinks} />
      <div className="mainbody">
        <div className="form-group input-group">
          <form onSubmit={submitHandler} className="addVin">
            <div className="form-group input-group mt-10">
              <label className="trainer_label ml-10 mr-2" htmlFor="vin">
                Vin:
              </label>
              <input
                className="form-control ml-0 mr-5"
                id="vin"
                type="text"
                name="vin"
                placeholder="Vin..."
                required
              />
              <button
                className="btn-primary px-10"
                type="submit"
                name="submitBtn"
              >
                Query Vin
              </button>
            </div>
          </form>
        </div>
        <div key="cars" className="container">
          <div className="row justify-content-start">
            <div className="content col-12 align-items-left px-1">
              <h1 className="sum-header">Car Vin({vin})</h1>
            </div>
          </div>
          <div className="row justify-content-start">
            {showCard && vin && <Card key={vinData.VehicleId} info={vinData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vin;
