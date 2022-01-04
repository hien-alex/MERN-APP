import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurant.js";

const AddReview = (props) => {
  const m = useLocation();
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: name,
      user_id: "123",
      restaurant_id: id,
    };

    RestaurantDataService.createReview(data)
      .then((response) => {
        console.log(response);
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
      <div>
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <h4>Create Review for {m.state.name}</h4>

              <br />
              <label>Comment:</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />
              <br />
              <label>Name:</label>
              <input
                type="textarea"
                className="form-control"
                required
                value={name}
                onChange={handleNameInput}
                name="name"
              ></input>
              <div>
                <br />
                <button onClick={saveReview} className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddReview;
