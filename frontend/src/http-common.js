import axios from "axios";

export default axios.create({
  baseURL: "https://ahien-restaurant-reviews.herokuapp.com/api/v1/restaurants",
  headers: {
    "Content-type": "application/json",
  },
});
