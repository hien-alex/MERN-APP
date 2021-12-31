import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import RestaurantDataService from "../services/restaurant.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Restaurants = (props) => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then((response) => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return <div className="App">Hello World.</div>;
};

export default Restaurants;
