import mongodb from "mongodb";
let restaurants;

export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`
      );
    }
  }

  static async getRestaurants() {
    let cursor;
    try {
      cursor = await restaurants.find({}, { projection: { name: 1, _id: 0 } });
    } catch (e) {
      console.error(`Unable to find: ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor.limit(10);

    try {
      const restaurantsList = await displayCursor.toArray();
      return { restaurantsList };
    } catch (e) {
      console.log(`Unable convert curosr to array, ${e}`);
    }
  }
}
