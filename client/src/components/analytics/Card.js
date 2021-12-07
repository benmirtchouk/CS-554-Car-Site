/* eslint react/prop-types: 0 */
import React from "react";
// import PropTypes from "prop-types";
import DataPicture from "./DataPicture";
import "../../App.css";
import "../../Carigs.css";

const Card = ({ info }) => {
  const { item } = info;
  const otherImg = "/images/ImgNotAvailable.png";
  const img = item.VehiclePicture ? item.VehiclePicture : otherImg;
  const key = `Card${item.Id}`;

  return (
    <div key={key} className="card">
      <img
        className="img-responsive mx-2 px-2"
        src={img}
        alt="Vehicle"
        onError={(e) => {
          e.target.src = otherImg;
          e.onerror = null;
        }}
      />
      <div className="card-body">
        <h2 className="card-title">{item.Description}</h2>
        <div className="card-text">
          <p className="detKey">
            <span className="detKey">Model Year:</span>
            {item.ModelYear}
          </p>
          <p className="detKey">
            <span className="detKey">Make:</span>
            {item.Make}
          </p>
          <p className="detKey">
            <span className="detKey">Model:</span>
            {item.Model}
          </p>
          <p className="detKey">
            <span className="detKey">Description:</span>
            {item.Description}
          </p>
          <p className="detKey">
            <span className="detKey">Complaints Count:</span>
            {item.ComplaintsCount}
          </p>
          <p className="detKey">
            <span className="detKey">Recalls Count:</span>
            {item.RecallsCount}
          </p>
          <p className="detKey">
            <span className="detKey">Investigation Count:</span>
            {item.InvestigationCount}
          </p>
          <p className="detKey">
            <span className="detKey">Overall Rating:</span> {item.OverallRating}
          </p>
          <p className="detKey">
            <span className="detKey">Overall Front Crash Rating:</span>
            {item.OverallFrontCrashRating}
          </p>
          <DataPicture
            data={{
              id: "Front-Crash-Picture",
              itemName: "Front Crash Picture",
              item: item.FrontCrashPicture,
            }}
          />
          <p className="detKey">
            <span className="detKey">Overall Crash Passengerside Rating:</span>
            {item.CrashPassengersideRating}
          </p>
          <p className="detKey">
            <span className="detKey">Overall Side Crash Rating:</span>
            {item.OverallSideCrashRating}
          </p>
          <p className="detKey">
            <span className="detKey">Front Crash Video:</span>
            {item.FrontCrashVideo}
          </p>
          <p className="detKey">
            <span className="detKey">Overall Side Crash Rating:</span>
            {item.OverallSideCrashRating}
          </p>
          <p className="detKey">
            <span className="detKey">Side Crash Driverside Rating:</span>
            {item.SideCrashDriversideRating}
          </p>
          <p className="detKey">
            <span className="detKey">Side Crash Passengerside Rating:</span>
            {item.SideCrashPassengersideRating}
          </p>
          <DataPicture
            data={{
              id: "Side-Crash-Picture",
              itemName: "Side Crash Picture",
              item: item.SideCrashPicture,
            }}
          />
          <p className="detKey">
            <span className="detKey">Side Crash Passengerside Rating:</span>
            {item.SideCrashPassengersideRating}
          </p>
          <p className="detKey">
            <span className="detKey">Side Crash Video:</span>
            {item.SideCrashVideo}
          </p>
          <p className="detKey">
            <span className="detKey">Rollover Rating:</span>
            {item.RolloverRating}
          </p>
          <p className="detKey">
            <span className="detKey">Rollover Rating2:</span>
            {item.RolloverRating2}
          </p>
          <p className="detKey">
            <span className="detKey">Rollover Possiblity:</span>
            {item.RolloverPossiblity}
          </p>
          <p className="detKey">
            <span className="detKey">Rollover Possiblity2:</span>
            {item.RolloverPossiblity2}
          </p>
          <p className="detKey">
            <span className="detKey">Side Pole Crash Rating:</span>
            {item.SidePoleCrashRating}
          </p>
          <DataPicture
            data={{
              id: "Side-Pole-Picture",
              itemName: "Side Pole Picture",
              item: item.SidePolePicture,
            }}
          />
          <p className="detKey">
            <span className="detKey">Side Pole Video:</span>
            {item.SidePoleVideo}
          </p>
          <p className="detKey">
            <span className="detKey">NHTSA Electronic Stability Control:</span>
            {item.NHTSAElectronicStabilityControl}
          </p>
          <p className="detKey">
            <span className="detKey">NHTSA Lane Departure Warning:</span>
            {item.NHTSALaneDepartureWarning}
          </p>
        </div>
      </div>
    </div>
  );
};

// Card.propTypes = {
//   info: PropTypes.node.isRequired,
// };
export default Card;
