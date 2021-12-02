import React, { useContext } from "react";
// import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

// eslint-disable-next-line react/prop-types
const ChkRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="login" />
        )
      }
    />
  );
};

// ChkRoute.propTypes = {
//   component: PropTypes.node.isRequired,
// };

export default ChkRoute;
