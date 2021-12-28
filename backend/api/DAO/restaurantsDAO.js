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

  static async getRestaurants({
    filter = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filter) {
      if ("name" in filter) {
        query = { $text: { $search: filter["name"] } };
      } else if ("cuisine" in filter) {
        query = { cuisine: { $eq: filter["cuisine"] } };
      } else if ("zipcode" in filter) {
        query = { "address.zipcode": { $eq: filter["zipcode"] } };
      }
    }

    let cursor;
    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`Unable to find ${e}.`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);
      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(`Unable to conver cursor to array!`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
    // let cursor;
    // try {
    //   cursor = await restaurants.find({}, { projection: { name: 1, _id: 0 } });
    // } catch (e) {
    //   console.error(`Unable to find: ${e}`);
    //   return { restaurantsList: [], totalNumRestaurants: 0 };
    // }

    // const displayCursor = cursor.limit(10);

    // try {
    //   const restaurantsList = await displayCursor.toArray();
    //   return { restaurantsList };
    // } catch (e) {
    //   console.log(`Unable convert curosr to array, ${e}`);
    // }
  }
  static async getCuisines() {
    let cuisines;
    try {
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines: ${e}`);
      return { error: e };
    }
  }

  static async getRestaurantsById(id) {
    let restaurant;
    try {
      restaurant = await restaurants.find({ restaurant_id: { $eq: id } });
      console.log(restaurant);
    } catch (e) {
      console.error(`Unable to get restaurnt with id:${id}`);
      return { error: e };
    }

    try {
      restaurant = await restaurant.toArray();
      return restaurant;
    } catch (e) {
      console.error(`Cannot convert restaurant to array: ${e}`);
      return { restaurant: "" };
    }
  }
}
