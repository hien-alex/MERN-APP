import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/add-review.js";
import Login from "./components/login.js";
import RestaurantsList from "./components/restaurants-list.js";
import Restaurants from "./components/restaurants.js";
import UpdateReview from "./components/update-review.js";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser = user;
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/" style={{ marginLeft: "2vw" }}>
          MERN Restaurants Project
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav"></ul>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/review/id/:id" element={<Restaurants />} />
          <Route exact path={"/restaurants"} element={<RestaurantsList />} />
          <Route exact path={"/"} element={<RestaurantsList />} />
          <Route path="/reviewOf/:id" element={<AddReview />} />
          {/* <Route path="/login" element={<Login login={login} />} /> */}
          <Route exact path="/reviewUpdate/:id" element={<UpdateReview />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
