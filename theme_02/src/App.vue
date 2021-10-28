<script>
export default {
  name: 'App'
}
</script>

<template>
  <section>
    <main role="main" class="container">
      <nav id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/currentWeather/Paris">Current Weather</router-link>
      </nav>
      <router-view />
    </main>
  </section> 
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@import'~bootstrap/dist/css/bootstrap.css'
</style>
