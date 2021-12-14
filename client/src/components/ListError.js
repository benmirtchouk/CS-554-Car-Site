import React from "react";
import PropTypes from "prop-types";

const ListError = ({ info }) => (
  <div>
    <div className="mainbody">
      <br />
      <br />
      <h2 className="error">{info.errorCode}</h2>
      <p className="error">{info.errorMessage}</p>
    </div>
  </div>
);

ListError.propTypes = {
  info: Object.isRequired,
};

ListError.propTypes = {
  info: PropTypes.node.isRequired,
};

export default ListError;
