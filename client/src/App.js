import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import CreateCampaignScreen from "./screens/CreateCampaignScreen";
import MyCampaignScreen from "./screens/MyCampaignScreen";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import PrivateRoute from "./components/Routes/PrivateRoute";
import NewUserRoute from "./components/Routes/NewUserRoute";
import Loading from "./components/Loading/Loading";

import { authByGoogle, validation } from "./actions/auth.action";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authUser();
    // eslint-disable-next-line
  }, []);
  const authUser = async () => {
    try {
      if (!window.localStorage.getItem("auth")) {
        const res = await authByGoogle();

        window.localStorage.setItem("auth", JSON.stringify(res.data));

        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        // return;
        return setLoading(false);
      }
      const { accessToken } = JSON.parse(window.localStorage.getItem("auth"));
      const res = await validation(accessToken);
      window.localStorage.setItem("auth", JSON.stringify(res.data));

      dispatch({
        type: "LOGGED_IN_USER",
        payload: res.data,
      });
      setLoading(false);
    } catch (error) {
      dispatch({
        type: "LOGOUT",
        payload: {},
      });
      window.localStorage.removeItem("auth");
      // console.log(e.response.data.error);
      setLoading(false);
    }
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {/* <Link to="/createCampaign">Create Campaign</Link>
        <Link to="/myCampaign">Create Campaign</Link> */}
          <Header />
          <div>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <NewUserRoute path="/signup" exact component={SignUpScreen} />
              <NewUserRoute path="/signin" exact component={SignInScreen} />
              <PrivateRoute
                path="/createCampaign"
                exact
                component={CreateCampaignScreen}
              />
              <PrivateRoute
                path="/myCampaign"
                exact
                component={MyCampaignScreen}
              />
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </Container>
  );
}

export default App;
