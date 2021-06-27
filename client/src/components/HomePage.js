import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function HomePage() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      {!user ? (
        <a href={`/api/auth/google`}>Login By Google</a>
      ) : (
        <div>
          <div>
            <Link to="/createCampaign">Create Campaign</Link>
          </div>
          <div>
            <Link to="/myCampaign">My Campaign</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
