import axios from "axios";

export default class MovieService {
  static async getMovies (query = "", by = "title", page = 0) {
    const response = await axios.get(`movies?${ by }=${ query }&page=${ page }`);
    return response.data;
  }

  static async getMovie (id: string) {
    const response = await axios.get(`movies/id/${ id }`);

    return response.data;
  }

  static async getRatings () {
    const response = await axios.get("movies/ratings");

    return response.data;
  }
};