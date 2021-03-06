import RestaurantsDAO from "./DAO/restaurantsDAO.js";

export default class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 51;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filter = {};
    if (req.query.cuisine) {
      filter.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filter.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filter.name = req.query.name;
    }

    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsDAO.getRestaurants({ filter, page, restaurantsPerPage });

    let response = {
      restaurants: restaurantsList,
      page: page,
      filter: filter,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    };

    res.json(response);
  }

  static async apiGetCuisines(req, res) {
    try {
      let cuisinesResponse = await RestaurantsDAO.getCuisines();
      res.json(cuisinesResponse);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiGetRestaurantWithID(req, res, next) {
    try {
      let restaurant_id = req.params.id || {};
      let restaurant = await RestaurantsDAO.getRestaurantsById(restaurant_id);
      if (!restaurant) {
        res.status(401).json({ error: "Not found!" });
        return;
      }
      res.json(restaurant);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetAllRestaurants(req, res) {
    try {
      let allRestaurants = await RestaurantsDAO.getAllRestaurants();
      if (!allRestaurants) {
        res.status(401).json({ error: "Unable to retrieve all restaurants!" });
        return;
      }
      res.json(allRestaurants);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
