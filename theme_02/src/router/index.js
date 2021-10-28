import { createWebHistory, createRouter } from "vue-router";
import Home from "../App.vue";
import CurrentWeather from "../components/CurrentWeather";
import ForecastWeather from "../components/ForecastWeather";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/currentWeather/:cityParameter",
    name: "Current Weather",
    component: CurrentWeather
  },
  {
    path: "/forecastWheater/:cityParameter",
    name: "Forecast Weather",
    component: ForecastWeather
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
