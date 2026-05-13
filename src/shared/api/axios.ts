import axios from "axios"

export const api = axios.create({
  baseURL: "https://www.googleapis.com",
  headers: {
    "Content-Type": "application/json",
  },
})
