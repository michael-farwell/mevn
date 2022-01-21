<script
    setup
    lang="ts">
  import { useAuthStore } from "@/store/auth.store";
  import { storeToRefs }  from "pinia";

  const store = useAuthStore();

  const { user } = storeToRefs(store);

  const logout = () => store.disconnect();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link
          to="/"
          class="navbar-brand">Movies App
      </router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
          class="collapse navbar-collapse"
          id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
              to="/"
              class="nav-link active">
            Home
          </router-link>
          <router-link
              to="/movies"
              class="nav-link active">
            Movies
          </router-link>
          <router-link
              to="/about"
              class="nav-link active">
            About
          </router-link>
          <router-link
              v-if="!user"
              to="/login"
              class="nav-link active">
            Login
          </router-link>
          <a
              v-if="user"
              @click="logout"
              class="nav-link active pointer">
            Logout ({{ user.id }} - {{ user.name }})
          </a>
        </div>
      </div>
    </div>
  </nav>

  <div class="container mt-4">
    <router-view />
  </div>

  <footer class="text-center text-lg-start bg-light text-muted mt-4">
    <div
        class="text-center p-4"
        style="background-color: gainsboro;">
      © 2022 Copyright -
      <a
          class="text-reset fw-bold text-decoration-none"
          target="_blank"
          href="https://twitter.com/greglim81"
      >
        Greg Lim
      </a> -
      <a
          class="text-reset fw-bold text-decoration-none"
          target="_blank"
          href="https://twitter.com/danielgarax"
      >
        Daniel Correa
      </a>
    </div>
  </footer>
</template>

<style
    scoped
    lang="scss">
.pointer {
  cursor: pointer;
}
</style>