/* eslint react/prop-types: 0 */
import React from "react";
// import PropTypes from "prop-types";
// import DataPicture from "./DataPicture";
import { Button, Card } from "react-bootstrap";
import "../../App.css";
import "../../Carigs.css";

const VinCard = ({ info }) => {
  const otherImg = "/images/ImgNotAvailable.png";
  const img = info.VehiclePicture ? info.VehiclePicture : otherImg;

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={img}
          alt="Vehicle"
          onError={(e) => {
            e.target.src = otherImg;
            e.onerror = null;
          }}
        />
        <Card.Body>
          <Card.Title>
            {info.Make} {info.Model} {info.ModelYear}
          </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      {/* <div className="card">
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
      </div> */}
    </>
  );
};

// Card.propTypes = {
//   info: PropTypes.node.isRequired,
// };
export default VinCard;
