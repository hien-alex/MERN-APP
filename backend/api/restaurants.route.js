import express from "express";
import RestaurantsController from "./controller.js";
const router = express.Router();

router.route("/").get(RestaurantsController.apiGetRestaurants);

export default router;
