import axios from "axios";

export const pathoSpotterApi = axios.create({
  // baseURL: "http://localhost:8000/v1",
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
