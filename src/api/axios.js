import axios from "axios";

const api = axios.create({
  baseURL: "/api", // رابط وهمي
  timeout: 1000,
});

export default api;