import axios from "axios";

// process.env.REACT_APP_SURVEY_API = process.env.REACT_APP_SURVEY_API || "/api";

export const createCampaign = async (data, token) =>
  await axios.post(`/api/mail`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchCampaign = async (token) =>
  await axios.get(`/api/mail`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const loadSchedules = async () => await axios.get(`/api/schedule`);
