<script
    setup
    lang="ts">
  const title = "About Us";
  const description = "This is the best movie application in the world!";
  const team = "Developed by Michael Farwell";
</script>

<template>
  <div class="card">
    <div class="card-header">{{ title }}</div>

    <div class="card-body">
      <h5 class="card-title">This is an about page.</h5>
      <p>{{ description }}</p>
      <p>{{ team }}</p>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>