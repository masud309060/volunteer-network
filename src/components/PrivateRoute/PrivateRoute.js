import React from "react";
import { Redirect, Route } from "react-router-dom";
import { userContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
    const {user} = React.useContext(userContext)
    const [loginUser, setLoginUser] = user
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
        loginUser.isSignIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
