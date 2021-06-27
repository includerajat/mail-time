import axios from "axios";

process.env.REACT_APP_SURVEY_API = process.env.REACT_APP_SURVEY_API || "/api";

export const createCampaign = async (data, token) =>
  await axios.post(`${process.env.REACT_APP_SURVEY_API}/mail`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchCampaign = async (token) =>
  await axios.get(`${process.env.REACT_APP_SURVEY_API}/mail`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const loadSchedules = async () =>
  await axios.get(`${process.env.REACT_APP_SURVEY_API}/schedule`);
