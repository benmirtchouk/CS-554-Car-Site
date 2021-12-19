import React from "react";

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

export default ListError;
