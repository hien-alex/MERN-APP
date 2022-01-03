import http from "../http-common";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return http.post("/review", data);
  }

  updateReview(data) {
    return http.put("/review", data);
  }

  deleteReview(id) {
    console.log(id);
    return http.delete(`/review?id=${id}`);
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }

  getReviews(id) {
    return http.get(`/review/id/${id}`);
  }
}

export default new RestaurantDataService();
