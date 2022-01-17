import axios from "axios";

export class ReviewService {
  static async createReview (data: any) {
    return await axios.post("movies/review", data);
  }

  static async deleteReview (data: any) {
    return axios.delete("movies/review", { data });
  }

  static async updateReview (data: any) {
    return axios.put("movies/review", data);
  }
}