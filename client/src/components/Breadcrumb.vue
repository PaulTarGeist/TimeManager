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
import { ref } from "@vue/reactivity";
export default {
  name: "Breadcrumb",
  props: {
    routeFirst: String,
    routeFirstName: String,
    routeSecondName: String,
  },
  setup(props) {
    const routeFirst = ref(props.routeFirst).value;
    const routeFirstName = ref(props.routeFirstName).value;
    const routeSecondName = ref(props.routeSecondName).value;

    console.log("routeFirst", routeFirst);
    console.log("routeFirstName", routeFirstName);
    console.log("routeSecondName", routeSecondName);
  },
};
</script>

<style scoped>
form input {
  width: 220px;
}
</style>
