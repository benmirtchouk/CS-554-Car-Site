import React from "react";
import '../App.css';
import '../Carigs.css';

const ErrorPage = (props) => {
    return (
      <div>
        <h2 className="error">***404***</h2>
        <p className="error">resource not found</p>
      </div>
    );
};

export default ErrorPage;
