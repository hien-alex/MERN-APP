import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class reviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`
      );
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: restaurantId,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          user_id: userId,
          _id: ObjectId(reviewId),
        },
        { $set: { text: text, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        user_id: userId,
        _id: ObjectId(reviewId),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete: ${e}`);
      return { error: e };
    }
  }
}
