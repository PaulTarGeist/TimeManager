<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'Dashboard' }"> Home </router-link>
      </li>
      <li vi-if="routeFirst" class="breadcrumb-item">
        <router-link :to="{ name: routeFirst }">
          {{ routeFirstName }}
        </router-link>
      </li>
      <li vi-if="routeSecondName" class="breadcrumb-item">
        {{ routeSecondName }}
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    routeFirst: String,
    routeFirstName: String,
    routeSecondName: String,
  },
};
</script>

<style scoped>
form input {
  width: 220px;
}
</style>
