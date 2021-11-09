<template>
  <div>
    <Breadcrumb
      routeFirst="AllWorkingtimes"
      routeFirstName="All Working Times"
      routeSecondName="Working time charts"
    />
    <h1>Workingtimes Charts</h1>
    <form class="form-group">
      <div class="form-group">
        <label for="start">Start date:</label>
        <input
          type="date"
          id="start"
          name="startFilter"
          v-model="startFilter"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="end">End date:</label>
        <input
          type="date"
          id="end"
          name="end"
          v-model="endFilter"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <input
          v-on:click="search()"
          class="submit_button btn btn-primary mr-1"
          type="button"
          value="Search"
        />
      </div>
    </form>
    <ul class="nav nav-pills nav-fill">
      <li class="nav-item">
        <a v-on:click.prevent="show('line-chart')" class="nav-link" href="#"
          >Line</a
        >
      </li>
      <li class="nav-item">
        <a v-on:click.prevent="show('bar-chart')" class="nav-link" href="#"
          >Bar</a
        >
      </li>
      <li class="nav-item">
        <a v-on:click.prevent="show('doughnut-chart')" class="nav-link" href="#"
          >Doughnut</a
        >
      </li>
    </ul>
    <div id="line-chart" class="chart-container">
      <WorkingtimeLineChart :workingtimes="{ workingtimes }" />
    </div>
    <div id="bar-chart" class="chart-container">
      <WorkingtimeBarChart :workingtimes="{ workingtimes }" />
    </div>
    <div id="doughnut-chart" class="chart-container">
      <WorkingtimeDoughnutChart :workingtimes="{ workingtimes }" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
const API_URL = "http://localhost:4000/api/workingtimes";
import WorkingtimeLineChart from "../components/WorkingtimeLineChart.vue";
import WorkingtimeBarChart from "../components/WorkingtimeBarChart.vue";
import WorkingtimeDoughnutChart from "../components/WorkingtimeDoughnutChart.vue";
import { ref } from "@vue/reactivity";
import Breadcrumb from "../components/Breadcrumb.vue";

export default {
  components: {
    WorkingtimeLineChart,
    WorkingtimeBarChart,
    WorkingtimeDoughnutChart,
    Breadcrumb,
  },
  data() {
    return {
      workingtimes: [],
    };
  },
  setup() {
    const startFilter = ref();
    const endFilter = ref();

    startFilter.value = moment().subtract(29, "days").format("YYYY-MM-DD");
    endFilter.value = moment().add(1, "days").format("YYYY-MM-DD");

    return { startFilter, endFilter, moment };
  },
  methods: {
    show(id) {
      document.querySelector("#line-chart").style.display = "none";
      document.querySelector("#bar-chart").style.display = "none";
      document.querySelector("#doughnut-chart").style.display = "none";
      document.querySelector("#" + id).style.display = "block";
    },

    search() {
      const start = {};
      const end = {};
      const user = JSON.parse(localStorage.getItem("user"));

      start.value = this.startFilter + " 00:00:00";
      end.value = this.endFilter + " 00:00:00";

      const data = {
        start: start.value,
        end: end.value,
        userId: user.id,
      };

      axios
        .get(`${API_URL}/${data.userId}?start=${data.start}&end=${data.end}`)
        .then((res) => {
          document.querySelector("#line-chart").style.display = "block";
          this.workingtimes = res.data;
        });
    },
  },
};
</script>

<style scoped>
.chart-container {
  display: none;
}
form input {
  width: 220px;
}
</style>
