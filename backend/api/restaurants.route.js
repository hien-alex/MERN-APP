import express from "express";
import RestaurantsController from "./RestaurantController.js";
// import ReviewsController from "./ReviewController.js";

const router = express.Router();

router.route("/").get(RestaurantsController.apiGetRestaurants);
router.route("/review");

export default router;
