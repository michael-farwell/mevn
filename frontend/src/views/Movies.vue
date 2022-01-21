<script
    setup
    lang="ts">
  import { MovieInterface } from "@/interfaces/movies.interface";
  import MovieService       from "@/services/MovieService";
  import { ref }            from "vue";
  import { useRouter }      from "vue-router";

  const router = useRouter();

  // Data
  let movies = ref([] as MovieInterface[]);
  let ratings = ref([] as string[]);
  let titleToSearch = ref("");
  let ratingToSearch = ref("");

  // Methods
  const filterMovies = async (type: string) => {
    let moviesData;

    if (type === "title") {
      moviesData = await MovieService.getMovies(titleToSearch.value, type);
    } else {
      moviesData = await MovieService.getMovies(ratingToSearch.value, type);
    }

    movies.value = moviesData.movies;
  };

  const getMovies = async () => {
    const moviesData = await MovieService.getMovies();
    movies.value = moviesData.movies;
  };

  const getRatings = async () => {
    ratings.value = await MovieService.getRatings();
  };

  // Created
  getMovies();
  getRatings();
</script>

<template>
  <div class="card">
    <div class="card-header">Movie Results</div>

    <div class="card-body">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex">
            <input
                type="text"
                v-model="titleToSearch"
                class="form-control"
                placeholder="Search by title">

            <a
                @click="filterMovies('title')"
                class="btn btn-primary ms-4">Search</a>
          </div>
        </div>

        <div class="col">
          <div class="d-flex">
            <select
                v-model="ratingToSearch"
                class="form-select">
              <option
                  disabled
                  selected
                  value="">Select by Rating
              </option>
              <option
                  v-for="rating in ratings"
                  :key="rating"
                  :value="rating">{{ rating }}
              </option>
            </select>

            <a
                @click="filterMovies('rated')"
                class="btn btn-primary ms-4">
              Filter
            </a>
          </div>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div
            v-for="movie in movies"
            class="col"
            :key="movie._id">
          <div class="card">
            <img
                v-if="movie.poster"
                :src="movie.poster"
                :alt="movie.title"
                class="card-img-top">

            <div class="card-body">
              <h5 class="card-title fw-bold">{{ movie.title }}</h5>
              <p
                  v-if="movie.rated"
                  class="card-text">
                Rated: {{ movie.rated }}
              </p>
              <p class="card-text">{{ movie.plot }}</p>
              <router-link
                  class="btn btn-primary"
                  :to="{name: 'Movie', params: {id: movie._id}}">
                View Reviews
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style
    scoped
    lang="scss">
.card-body {
  text-align: left
}
</style>