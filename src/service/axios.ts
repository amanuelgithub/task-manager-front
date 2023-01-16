import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 4000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
