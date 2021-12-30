import axios from "axios";

export default axios.create({
  baseURL: "http://http://localhost:3000/api/v1/restaurants",
  headers: {
    "Content-type": "application/json",
  },
});
