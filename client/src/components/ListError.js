import React from "react";
import PropTypes from "prop-types";

const ListError = ({ info }) => {
  <div>
    <h2 className="error">{info.errorCode}</h2>
    <p className="error">{info.errorMessage}</p>
  </div>;
};

ListError.propTypes = {
  info: Object.isRequired,
};

ListError.propTypes = {
  info: PropTypes.node.isRequired,
};

export default ListError;
