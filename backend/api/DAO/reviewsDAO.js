import mongodb from "mongodb"
import { ObjectId } from mongodb.ObjectId

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
      try{
          const reviewDoc = {
              name: user.name,
              user_id: user._id,
              date: date,
              text: review,
              restaurant_id: ObjectId(restaurantId)
          }
          return await reviews.insertOne(reviewDoc)
      } catch (e) {
          console.error(`Unable to post review: ${e}`)
          return {error:e}
      }
  }
}
