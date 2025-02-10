import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${import.meta.env.VITE_AUTH_API_KEY}`,
  },
});
