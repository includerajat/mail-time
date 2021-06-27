import axios from "axios";
axios.defaults.withCredentials = true;

// process.env.REACT_APP_SURVEY_API = process.env.REACT_APP_SURVEY_API || "/api";

export const signup = async (data) => await axios.post(`/api/signup`, data);

export const signin = async (data) => await axios.post(`/api/signin`, data);

export const authByGoogle = async () => await axios.get(`/api/current_user`);

export const validation = async (token) =>
  await axios.get(`/api/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    },
  });

export const logout = async () => await axios.get(`/api/logout`);
