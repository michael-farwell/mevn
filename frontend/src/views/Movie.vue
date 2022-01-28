<script
    setup
    lang="ts">
  import { Movie, Review } from "@/interfaces/movies.interface";
  import MovieService      from "@/services/MovieService";
  import { ReviewService } from "@/services/ReviewService";
  import { useAuthStore }  from "@/store/auth.store";
  import AddReview         from "@/views/AddReview.vue";
  import moment            from "moment";
  import { storeToRefs }   from "pinia";
  import { ref }           from "vue";
  import { useRoute }      from "vue-router";

  const route = useRoute();
  const store = useAuthStore();

  const { user } = storeToRefs(store);

  let movie = ref<Movie>({ _id: "", plot: "", poster: "", rated: "", title: "", reviews: [] });
  let newReviewMessage = ref<string>("");

  const deleteReview = async (reviewId: number): Promise<void> => {
    if (!user.value) {
      return;
    }

    const data = {
      user_id: user.value.id,
      review_id: reviewId,
    };

    await ReviewService.deleteReview(data);
    await getMovie();
  };
  const editReview = (review: Review): void => {
    if (review.editing) {
      review.review = newReviewMessage.value;
      saveUpdatedReview(review);
      review.editing = false;
    } else {
      newReviewMessage.value = review.review;
      review.editing = true;
    }
  };
  const getFormattedDate = (date: Date) => moment(date).
      format("Do MMMM YYYY");
  const getMovie = async () => {
    const movieData = await MovieService.getMovie(route.params.id as string);
    movieData.reviews = movieData.reviews.map((v: Review) => ({ ...v, editing: false }));
    movie.value = movieData;
  };
  const saveUpdatedReview = async (newReview: Review): Promise<void> => {
    const data = {
      review: newReview.review,
      name: newReview.name,
      user_id: newReview.user_id,
      movie_id: newReview.movie_id,
      review_id: newReview._id,
    };
    await ReviewService.updateReview(data);
  };
  const verifyAuthorship = (reviewUserId: number): boolean => {
    return !!user.value && user.value.id === reviewUserId;
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
            <AddReview
                v-if="user && user.id"
                :movie-id="movie._id"
                @update-movie-info="getMovie" />
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
              <p
                  class="card-text"
                  v-if="!review.editing">
                {{ review.review }}
              </p>
              <p
                  class="card-text"
                  v-if="review.editing">
                <input
                    v-model="newReviewMessage"
                    type="text"
                    class="form-control" />
              </p>
              <a
                  v-if="verifyAuthorship(review.user_id)"
                  @click="editReview(review)"
                  class="btn btn-primary me-3">Edit</a>
              <a
                  v-if="verifyAuthorship(review.user_id)"
                  @click="deleteReview(review._id)"
                  class="btn btn-danger">
                Delete
              </a>
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