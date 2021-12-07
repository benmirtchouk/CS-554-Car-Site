/* eslint react/prop-types: 0 */
import React from "react";
// import PropTypes from "prop-types";
// import DataPicture from "./DataPicture";
import "../../App.css";
import "../../Carigs.css";

const VinCard = ({ info }) => {
  const otherImg = "/images/ImgNotAvailable.png";
  const img = info.VehiclePicture ? info.VehiclePicture : otherImg;
  console.log(`info`);
  console.log(info);
  const key = `c-${info.VehicleId}`;

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
        <h2 className="card-title">{info.Make} {info.Model} {info.ModelYear}</h2>
        <div className="card-text">
          <p className="detKey">
            <span className="detKey">Manufacturer Name:</span>
            {info.ManufacturerName}
          </p>
          <p className="detKey">
            <span className="detKey">Plant Country:</span>
            {info.PlantCountry}
          </p>
          <p className="detKey">
            <span className="detKey">Plant State:</span>
            {info.PlantState}
          </p>
          <p className="detKey">
            <span className="detKey">Plant City:</span>
            {info.PlantCity}
          </p>
          <p className="detKey">
            <span className="detKey">Vehicle Type:</span>
            {info.VehicleType}
          </p>
          <p className="detKey">
            <span className="detKey">Body Class:</span>
            {info.BodyClass}
          </p>
          <p className="detKey">
            <span className="detKey">Doors:</span>
            {info.Doors}
          </p>
          <p className="detKey">
            <span className="detKey">Windows:</span> {info.Windows}
          </p>
          <p className="detKey">
            <span className="detKey">Drive Type:</span>
            {info.DriveType}
          </p>
          <p className="detKey">
            <span className="detKey">Engine Configuration:</span>
            {info.EngineConfiguration}
          </p>
          <p className="detKey">
            <span className="detKey">Transmission Style:</span>
            {info.TransmissionStyle}
          </p>
          <p className="detKey">
            <span className="detKey">Vehicle Id</span>
            {info.VehicleId}
          </p>
        </div>
      </div>
    </div>
  );
};

// Card.propTypes = {
//   info: PropTypes.node.isRequired,
// };
export default VinCard;
