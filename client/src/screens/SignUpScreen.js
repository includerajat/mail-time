import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../actions/auth.action";
import UserForm from "../components/UserForm";
import Loading from "../components/Loading/Loading";

const SignUpScreen = (props) => {
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
      const res = await signup(data);
      setLoading(false);
      // console.log(res);
      window.localStorage.setItem("auth", JSON.stringify(res.data));
      dispatch({
        type: "LOGGED_IN_USER",
        payload: res.data,
      });
      history.push("/");
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          error.response.data &&
          error.response.data.error.message
      );
      console.log({ ...error });
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
            title="Sign Up"
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

export default SignUpScreen;
