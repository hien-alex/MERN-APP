import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurant.js";

const UpdateReview = (props) => {
  const m = useLocation();
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: name,
      user_id: "123",
      review_id: id,
    };

    RestaurantDataService.updateReview(data)
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
            <h4>Updated successfully!</h4>
            <Link
              className="btn btn-primary"
              to={`/review/id/${m.state.restaurant_id}`}
            >
              Back to reviews
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <h4>Update Review for {m.state.name}</h4>
              <br />
              <label>New Comment:</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />

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

export default UpdateReview;
