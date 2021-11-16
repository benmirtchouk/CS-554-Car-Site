import React from "react";
import '../App.css';
import '../Carigs.css';

const ListError = (props) => {

  console.log(`${props.info.errorCode}`);
  console.log(`${props.info.errorMessage}`);

  return (
     <div>
     <h2 className="error">{ props.info.errorCode }</h2>
     <p className="error">{ props.info.errorMessage }</p>
     </div>
  );
};

export default ListError;
