import React, { useContext } from "react";
import { useParams, useLocation } from 'react-router-dom';

import { AuthContext } from "../../firebase/Auth";

const MessageBoard = () => {

  const location = useLocation();
  const { sellerName } = location.state;
  const { sellerId } = useParams();

  const auth = useContext(AuthContext);
  const userName = auth.currentUser.displayName;

  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>MessageBoard</h1>
        <br />
        <br />
        <p>Chat with {sellerName} and id: {sellerId}</p>
        <p>User: {userName}</p>
      </div>
    </div>
  );
}

export default MessageBoard;
