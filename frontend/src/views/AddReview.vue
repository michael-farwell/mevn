<script
    setup
    lang="ts">
  import { ReviewService } from "@/services/ReviewService";
  import { useAuthStore }  from "@/store/auth.store";
  import { ref }           from "vue";

  const emit = defineEmits(["updateMovieInfo"]);
  const props = defineProps({
    movieId: String,
  });
  const store = useAuthStore();

  let message = ref<string>("");

  const saveReview = async (): Promise<void> => {
    if (message.value !== "") {
      const data = {
        review: message.value,
        name: store.user?.name,
        user_id: store.user?.id,
        movie_id: props.movieId,
      };

      try {
        const response = await ReviewService.createReview(data);
        message.value = "";
        emit("updateMovieInfo");
      } catch (e) {} finally {
      }
    }
  };
</script>

<template>
  <div class="card">
    <div class="card-header">
      Add Review
    </div>

    <div class="card-body">
      <form>
        <div class="mb-3">
          <label
              class="form-label"
              for="message">Message</label>
          <input
              id="message"
              name="message"
              v-model="message"
              class="form-control">
        </div>

        <a
            @click="saveReview"
            class="btn btn-primary">
          Submit
        </a>
      </form>
    </div>
  </div>
</template>