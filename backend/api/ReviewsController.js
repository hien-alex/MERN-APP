import reviewsDAO from "./DAO/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      console.log(req.body.restaurant_id);
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const postResponse = reviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res) {
    try {
      const reviewId = req.body.review_id;
      const newReview = req.body.text;
      const date = new Date();

      const updateResponse = await reviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        newReview,
        date
      );
      var { error } = updateResponse;
      if (error) {
        res.status(400).json({ error });
      }
      if (updateResponse.modifiedCount === 0) {
        throw new Error(
          `Unable to update review - user may not be original poster`
        );
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;
      const deleteResponse = await reviewsDAO.deleteReview(reviewId, userId);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
