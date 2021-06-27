import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const NewUserRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  return auth && auth.accessToken ? <Redirect to="/" /> : <Route {...rest} />;
};

export default NewUserRoute;
