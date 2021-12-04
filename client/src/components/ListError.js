import React from "react";

const ListError = ({ info }) => {
  console.err(`${info.errorCode}`);
  console.err(`${info.errorMessage}`);

  return (
    <div>
      <h2 className="error">{info.errorCode}</h2>
      <p className="error">{info.errorMessage}</p>
    </div>
  );
};

ListError.propTypes = {
  info: Object.isRequired,
};

export default ListError;
