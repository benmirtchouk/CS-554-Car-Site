/* eslint react/prop-types: 0 */
import React from "react";
// import PropTypes from "prop-types";
import ReactStars from "react-rating-stars-component";
import { Container, Row, Col, Table } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../App.css";
import "../../Carigs.css";

const Car = ({ info }) => {
  const { item } = info;
  const otherImg = "/images/ImgNotAvailable.png";
  const img = item.VehiclePicture ? item.VehiclePicture : otherImg;

  const carousel_pics = ['FrontCrashPicture', 'SideCrashPicture', 'SidePolePicture'].filter(pic_type => item[pic_type]);
  return (
    <Container>
      <Row className="full-width">
        <Col>
          <img
            src={img}
            className="saftey-car"
            alt="Vehicle"
            onError={(e) => {
              e.target.src = otherImg;
              e.onerror = null;
            }}
          />
          <p className="detKey">{item.Description}</p>
        </Col>
        { carousel_pics.length > 0 && (
          <Col>
            <h2>Crash Images:</h2>
            <Carousel>
              { carousel_pics.map(pic_type => (
                <div key={pic_type}>
                  <img
                    className="mx-auto"
                    src={item[pic_type]}
                    alt="Retrieved Car"
                    onError={(e) => {
                      e.target.src = otherImg;
                      e.onerror = null;
                    }}
                  />
                </div>
              )) }
            </Carousel>
          </Col>
        )}
      </Row>
      <Row>
        <Col md={6}>
          <h2>Overall:</h2>
          <Table>
            <tbody>
              <tr>
                <td>Complaints Count</td>
                <td>{item.ComplaintsCount}</td>
              </tr>
              <tr>
                <td>Recalls Count</td>
                <td>{item.RecallsCount}</td>
              </tr>
              <tr>
                <td>Investigation Count</td>
                <td>{item.InvestigationCount}</td>
              </tr>
              <tr>
                <td>Overall Rating</td>
                <td>
                  <ReactStars
                    edit={false}
                    count={parseInt(item.OverallRating)}
                    size={15}
                    activeColor="#ffd700"
                  />
                </td>
              </tr>
              <tr>
                <td>Overall Front Crash Rating</td>
                <td>
                  <ReactStars
                    edit={false}
                    count={parseInt(item.OverallFrontCrashRating)}
                    size={15}
                    activeColor="#ffd700"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <h2>Crash Ratings:</h2>
          <Table>
            <tbody>
              <tr>
                <td>Side Crash Rating</td>
                <td>
                  <ReactStars
                    edit={false}
                    count={parseInt(item.OverallSideCrashRating)}
                    size={15}
                    activeColor="#ffd700"
                  />
                </td>
              </tr>
              <tr>
                <td>Side Crash Driverside Rating</td>
                <td>
                  <ReactStars
                    edit={false}
                    count={parseInt(item.SideCrashDriversideRating)}
                    size={15}
                    activeColor="#ffd700"
                  />
                </td>
              </tr>
              <tr>
                <td>Side Crash Passengerside Rating</td>
                <td>
                  <ReactStars
                    edit={false}
                    count={parseInt(item.SideCrashPassengersideRating)}
                    size={15}
                    activeColor="#ffd700"
                  />
                </td>
              </tr>
              <tr>
                <td>Rollover Rating</td>
                <td>
                  <ReactStars
                    edit={false}
                    count={parseInt(item.RolloverRating)}
                    size={15}
                    activeColor="#ffd700"
                  />
                </td>
              </tr>
              <tr>
                <td>Side Pole Crash Rating</td>
                <td>
                  <ReactStars
                    edit={false}
                    count={parseInt(item.SidePoleCrashRating)}
                    size={15}
                    activeColor="#ffd700"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* <div key={key} className="card">
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
            <DataPicture
              data={{
                id: "Front-Crash-Picture",
                itemName: "Front Crash Picture",
                item: item.FrontCrashPicture,
              }}
            />
            <p className="detKey">
              <span className="detKey">
                Overall Crash Passengerside Rating:
              </span>
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
              <span className="detKey">
                NHTSA Electronic Stability Control:
              </span>
              {item.NHTSAElectronicStabilityControl}
            </p>
            <p className="detKey">
              <span className="detKey">NHTSA Lane Departure Warning:</span>
              {item.NHTSALaneDepartureWarning}
            </p>
          </div>
        </div>
      </div> */}
    </Container>
  );
};

// Card.propTypes = {
//   info: PropTypes.node.isRequired,
// };
export default Car;
