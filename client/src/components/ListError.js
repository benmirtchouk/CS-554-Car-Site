import React from "react";
import PropTypes from "prop-types";
import Sidebar from "./sidebars/Sidebar";

const ListError = ({ info }) => {
  const slinks = [{ name: "Home", link: "/" }];
  return (
    <div>
      <Sidebar sideLinks={slinks} />
      <div className="mainbody">
        <br />
        <br />
        <h2 className="error">{info.errorCode}</h2>
        <p className="error">{info.errorMessage}</p>
      </div>
    </div>
  );
};

ListError.propTypes = {
  info: Object.isRequired,
};

ListError.propTypes = {
  info: PropTypes.node.isRequired,
};

export default ListError;
