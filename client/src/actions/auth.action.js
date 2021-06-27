import axios from "axios";
axios.defaults.withCredentials = true;

process.env.REACT_APP_SURVEY_API = process.env.REACT_APP_SURVEY_API || "/api";

export const signup = async (data) =>
  await axios.post(`${process.env.REACT_APP_SURVEY_API}/signup`, data);

export const signin = async (data) =>
  await axios.post(`${process.env.REACT_APP_SURVEY_API}/signin`, data);

export const authByGoogle = async () =>
  await axios.get(`${process.env.REACT_APP_SURVEY_API}/current_user`);

export const validation = async (token) =>
  await axios.get(`${process.env.REACT_APP_SURVEY_API}/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    },
  });

export const logout = async () =>
  await axios.get(`${process.env.REACT_APP_SURVEY_API}/logout`);
