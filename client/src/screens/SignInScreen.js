import { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../actions/auth.action";
import UserForm from "../components/UserForm";
import Loading from "../components/Loading/Loading";

const SignInScreen = (props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { history } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        username,
        password,
      };
      const res = await signin(data);
      setLoading(false);
      window.localStorage.setItem("auth", JSON.stringify(res.data));
      dispatch({
        type: "LOGGED_IN_USER",
        payload: res.data,
      });
      history.push("/");
    } catch (error) {
      setLoading(false);
      // console.log(error);
      setError(
        error.response &&
          error.response.data &&
          error.response.data.error.message
      );
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <p>{error}</p>}
          <UserForm
            title="Sign In"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default SignInScreen;
