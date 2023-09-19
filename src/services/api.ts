import axios from "axios";

export const pathoSpotterApi = axios.create({
  baseURL: "http://localhost:8080",
});
