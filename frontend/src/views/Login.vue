<script
    setup
    lang="ts">
  import { useAuthStore } from "@/store/auth.store";
  import { ref }          from "vue";
  import { useRouter }    from "vue-router";

  const store = useAuthStore();
  const router = useRouter();

  let userId = ref<number | null>(null);
  let userName = ref<string | null>(null);

  const login = () => {
    if (!(!userId.value || !userName.value)) {
      store.connect(userId.value, userName.value);

      router.push({ name: "Home" });
    }
  };
</script>

<template>
  <div class="card">
    <div class="card-header">Login</div>

    <div class="card-body">
      <form>
        <div class="row">
          <div class="col">
            <div class="mb-3 row">
              <label
                  for="userID"
                  class="col-sm-2 col-form-label">ID</label>
              <div class="col-sm-10">
                <input
                    v-model="userId"
                    id="userID"
                    name="userId"
                    type="number"
                    class="form-control">
              </div>
            </div>
          </div>

          <div class="col">
            <div class="mb-3 row">
              <label
                  for="userName"
                  class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input
                    id="userName"
                    name="userName"
                    v-model="userName"
                    type="text"
                    class="form-control">
              </div>
            </div>
          </div>
        </div>
        <a
            @click="login"
            class="btn btn-primary">Submit</a>
      </form>
    </div>
  </div>
</template>