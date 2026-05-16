import axios from "axios"

export const api = axios.create({
  baseURL: "https://www.googleapis.com",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: import.meta.env.VITE_GOOGLE_API_KEY,
  },
})
