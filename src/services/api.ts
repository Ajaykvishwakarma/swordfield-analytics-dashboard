import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error("Rate limit exceeded. Please try again later.");
    }
    return Promise.reject(error);
  }
);
