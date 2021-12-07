/* eslint react/prop-types: 0 */
import React from "react";
// import PropTypes from "prop-types";
import "../../App.css";
import "../../Carigs.css";

const DataPicture = ({ data: { id, itemName, item } }) => {
  const otherImg = "/images/ImgNotAvailable.png";
  let img = item;
  const key = `${id}-${itemName}`;
  if (item === undefined) img = otherImg;

  return (
    <p key={key} className="detKey">
      <span className="detKey">{itemName}:</span>
      <img
        className="mx-auto"
        src={img}
        alt="Retrieved Car"
        onError={(e) => {
          e.target.src = otherImg;
          e.onerror = null;
        }}
      />
    </p>
  );
};

// DataPicture.propTypes = {
//   data: PropTypes.node.isRequired,
//   id: PropTypes.string.isRequired,
//   item: PropTypes.node.isRequired,
//   itemName: PropTypes.string.isRequired,
// };

export default DataPicture;
