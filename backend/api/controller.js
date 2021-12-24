import RestaurantsDAO from "./DAO/restaurantsDAO.js";

export default class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    try {
      let restaurants = await RestaurantsDAO.getRestaurants();
      res.json(restaurants);
    } catch (e) {
      console.log(`api ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
