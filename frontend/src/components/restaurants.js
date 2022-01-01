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
  };

  const [restaurant, setRestaurant] = useState(initialRestaurantState);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = (id) => {
    console.log(id);
    RestaurantDataService.getReviews(parseInt(40361606))
      .then((response) => {
        setReviews(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  const deleteReview = (id) => {
    RestaurantDataService.deleteReview(id)
      .then((response) => {
        console.log("Success!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong> {restaurant.cuisine}
            <br />
            <strong>Address: </strong> {restaurant.address.building}{" "}
            {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link to={"/"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {reviews.length > 0 ? (
              reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}
                          <br />
                          <strong>User: </strong> {review.name}
                          <br />
                          <strong>Date: </strong> {review.date}
                        </p>
                        <div className="row">
                          <button onClick={deleteReview(review._id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>No restaurant selected.</div>
      )}
    </div>
  );
};

export default Restaurants;
