import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { logout } from "../actions/auth.action";

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutButton = () => {
    dispatch({
      type: "LOGOUT",
      payload: {},
    });
    window.localStorage.removeItem("auth");
    history.push("/");
    logout();
  };

  const RenderRightHeader = () => {
    if (!user) {
      return (
        <>
          <div className="mx-3">
            <Navbar.Text>
              <Link to="/signup">Sign Up</Link>
            </Navbar.Text>
          </div>
          <div className="mx-3">
            <Navbar.Text>
              <a href={`${process.env.REACT_APP_SURVEY_API}/auth/google`}>
                Login By Google
              </a>
            </Navbar.Text>
          </div>
          <div className="mx-3">
            <Navbar.Text>
              <Link to="/signin">Sign In</Link>
            </Navbar.Text>
          </div>
        </>
      );
    }
    const { username } = user;
    return (
      <>
        <Navbar.Text>Signed in as: {username}</Navbar.Text>
        <Navbar.Text>
          <button onClick={handleLogoutButton} className="btn btn-link">
            Logout
          </button>
        </Navbar.Text>
      </>
    );
  };

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Link to="/">Mail Time</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <RenderRightHeader />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
