import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurant";

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let page = params.get("page") ? params.get("page") - 1 : 0;

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  useEffect(() => {
    retrieveRestaurants();
  }, [page]);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    // let filteredData = allRestaurants[0].filter((x) =>
    //   x.name.toLowerCase().includes("riviera")
    // );
    // console.log(filteredData);
    // setRestaurants(filteredData);
    RestaurantDataService.find(query, by)
      .then((response) => {
        // console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll(page ? page : 0)
      .then((response) => {
        // console.log(response.data);
        // allRestaurants = response.data.restaurants;
        // console.log(allRestaurants);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        // console.log(response.data);
        setCuisines(cuisines.concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-sm">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-sm">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Zipcode"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-sm">
          <select className="form-control" onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine) => {
              return (
                <option value={cuisine}>{cuisine.substring(0, 20)}</option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        {restaurants.map((restaurant) => {
          // console.log(restaurant.restaurant_id);
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={`/review/id/${restaurant.restaurant_id}`}
                      className="btn btn-primary col-sm mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-sm mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class={`page-item ${currentPage == 1 ? "disabled" : ""}`}>
            <Link
              class="page-link"
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              to={`/restaurants/?page=${currentPage - 1}`}
            >
              Previous
            </Link>
          </li>

          <li class="page-item">
            <Link
              class="page-link"
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              to={`/restaurants/?page=${currentPage + 1}`}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
      <br />
    </div>
  );
};

export default RestaurantsList;
