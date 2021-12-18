import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../firebase/Auth";

const PrivateRoute = ({ component: RouteComponent, socket, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <RouteComponent socket={socket} {...routeProps} />
        ) : (
          <Redirect to="login" />
        )
      }
    />
  );
};

// PrivateRoute.propTypes = {
//   component: PropTypes.node.isRequired,
// };

export default PrivateRoute;
