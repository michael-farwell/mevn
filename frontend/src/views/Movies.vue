<script
    setup
    lang="ts">
  import { Movie }     from "@/interfaces/movies.interface";
  import MovieService  from "@/services/MovieService";
  import { ref }       from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  // Data
  let currentPage = ref<number>(0);
  let entriesPerPage = ref<number>(20);
  let movies = ref<Movie[]>([]);
  let ratings = ref<string[]>([]);
  let titleToSearch = ref<string>("");
  let totalPages = ref<number>(0);
  let typeToSearch = ref<string>("");
  let ratingToSearch = ref<string>("");

  // Methods
  const filterMovies = async (type: string) => {
    typeToSearch.value = type;
    currentPage.value = 0;
    await getMovies();
  };
  const getMovies = async () => {
    let query = "";

    if (typeToSearch.value === "title") {
      query = titleToSearch.value;
    } else if (typeToSearch.value === "rated") {
      query = ratingToSearch.value;
    }

    const moviesData = await MovieService.getMovies(query, typeToSearch.value, currentPage.value);

    totalPages.value = Math.ceil(moviesData.total_results / entriesPerPage.value) - 1;

    movies.value = moviesData.movies;
  };
  const getNextPage = async () => {
    currentPage.value += 1;

    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }

    await getMovies();
  };
  const getPrevPage = async () => {
    currentPage.value -= 1;

    if (currentPage.value < 0) {
      currentPage.value = 0;
    }

    await getMovies();
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

    <nav>
      <ul class="pagination ms-3">
        <li class="page-item">
          <a
              class="page-link pointer"
              @click="getPrevPage()">
            Get previous {{ entriesPerPage }}
          </a>
        </li>
        <li class="page-item disabled">
          <a
              href="#"
              class="page-link"
              tabindex="-1"
              aria-disabled="true">
            Showing Page: {{ currentPage + 1 }}
          </a>
        </li>
        <li class="page-item">
          <a
              class="page-link pointer"
              @click="getNextPage()">
            Get next {{ entriesPerPage }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style
    scoped
    lang="scss">
.card-body {
  text-align: left
}
</style>