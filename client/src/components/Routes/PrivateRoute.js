import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  return auth && auth.accessToken ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/signin" />
  );
};

export default PrivateRoute;
