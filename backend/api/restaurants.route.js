import express from "express";
import RestaurantsController from "./RestaurantController.js";
import ReviewsController from "./ReviewsController.js";

const router = express.Router();

router.route("/").get(RestaurantsController.apiGetRestaurants);
router.route("/cuisines").get(RestaurantsController.apiGetCuisines);
router
  .route("/review/id/:id")
  .get(ReviewsController.apiGetReviewsByRestaurantID);
router.route("/id/:id").get(RestaurantsController.apiGetRestaurantWithID);

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
