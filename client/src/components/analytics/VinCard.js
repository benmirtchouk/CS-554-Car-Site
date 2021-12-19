/* eslint react/prop-types: 0 */
import React from "react";
// import PropTypes from "prop-types";
// import DataPicture from "./DataPicture";
import { Table } from "react-bootstrap";
import "../../App.css";
import "../../Carigs.css";

const VinCard = ({ info }) => {
  const otherImg = "/images/ImgNotAvailable.png";
  const img = info.VehiclePicture ? info.VehiclePicture : otherImg;

  return (
    <>
      <img
        src={img}
        alt="Vehicle"
        onError={(e) => {
          e.target.src = otherImg;
          e.onerror = null;
        }}
      />
      <Table>
        <tbody>
          <tr>
            <td>Manufacturer Name</td>
            <td>{info.ManufacturerName}</td>
          </tr>
          <tr>
            <td>Plant Country</td>
            <td>{info.PlantCountry}</td>
          </tr>
          <tr>
            <td>Plant State</td>
            <td>{info.PlantState}</td>
          </tr>
          <tr>
            <td>Plant City</td>
            <td>{info.PlantCity}</td>
          </tr>
          <tr>
            <td>Vehicle Type</td>
            <td>{info.VehicleType}</td>
          </tr>
          <tr>
            <td>Body Class</td>
            <td>{info.BodyClass}</td>
          </tr>
          <tr>
            <td>Doors</td>
            <td>{info.Doors}</td>
          </tr>
          <tr>
            <td>Drive Type</td>
            <td>{info.DriveType}</td>
          </tr>
          <tr>
            <td>Engine Configuration</td>
            <td>{info.EngineConfiguration}</td>
          </tr>
          <tr>
            <td>Transmission Style</td>
            <td>{info.TransmissionStyle}</td>
          </tr>
          <tr>
            <td>Vehicle Id</td>
            <td>{info.VehicleId}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

// Card.propTypes = {
//   info: PropTypes.node.isRequired,
// };
export default VinCard;
