import axios from "axios";

export const pathoSpotterApi = axios.create({
  // baseURL: "http://localhost:8000/v1",
  baseURL: "http://terumo-api:8000/v1",
});
