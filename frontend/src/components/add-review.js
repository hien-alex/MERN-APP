import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurant.js";

const AddReview = (props) => {
  const m = useLocation();
  const { name } = m.state.name;
  const { id } = useParams();
  let initialReviewState = "";
  let submitted = false;
  const [review, setReview] = useState("");

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: "test",
      user_id: "123",
      restaurant_id: id,
    };
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
              <label htmlFor="description">
                Create Review for {m.state.name}
              </label>
              <input
                type="text"
                className="form-control"
                id="text"
                reuired
                value={review}
                onChange={handleInputChange}
                name="text"
              />
              <div>
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
