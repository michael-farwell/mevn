<script
    setup
    lang="ts">
  import { MovieInterface } from "@/interfaces/movies.interface";
  import MovieService       from "@/services/MovieService";
  import moment             from "moment";
  import { ref }            from "vue";
  import { useRoute }       from "vue-router";

  const route = useRoute();

  let movie = ref<MovieInterface>({ _id: "", plot: "", poster: "", rated: "", title: "", reviews: [] });

  const getFormattedDate = (date: Date) => moment(date).
      format("Do MMMM YYYY");

  const getMovie = async () => {
    const movieData = await MovieService.getMovie(route.params.id as string);
    movie.value = movieData;
  };

  getMovie();
</script>

<template>
  <div class="card">
    <div class="card-header text-center">
      {{ movie.title }}
    </div>

    <div class="card-body">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <img
              v-if="movie.poster"
              :src="movie.poster"
              :alt="movie.title">
        </div>

        <div class="col-md-6 col-sm-12">
          <p class="card-text">{{ movie.plot }}</p>
          <div>
            Form to Add Reviews
          </div>
          <hr>
          <h3>Reviews</h3>
          <ul class="list-group">
            <li
                class="list-group-item py-3"
                v-for="review in movie.reviews"
                :key="review._id">
              <h5 class="card-title">Review by {{ review.name }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ getFormattedDate(review.date) }}</h6>
              <p class="card-text">{{ review.review }}</p>
              <a class="btn btn-primary me-3">Edit</a>
              <a class="btn btn-danger">Delete</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style
    scoped
    lang="scss">
.card-body {
  text-align: left;
}
</style>