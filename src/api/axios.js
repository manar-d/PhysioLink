import axios from "axios";

const api = axios.create({
  baseURL: "/api", // fake link
  timeout: 1000,
});

export default api;