<template>
  <div>
    <h1>Workingtimes Charts</h1>
    <form>
      <div class="form-group">
        <label for="start">Start date:</label>
        <input
          type="date"
          id="start"
          name="startFilter"
          v-model="startFilter"
        />
      </div>
      <div class="form-group">
        <label for="end">End date:</label>
        <input type="date" id="end" name="end" v-model="endFilter" />
      </div>
      <div class="form-group">
        <input
          v-on:click="search()"
          class="btn btn-primary mr-1"
          type="button"
          value="Search"
        />
      </div>
    </form>
    <WorkingtimeLineChart :workingtimes="{ workingtimes }" />
    <WorkingtimeBarChart :workingtimes="{ workingtimes }" />
    <WorkingtimeDoughnutChart :workingtimes="{ workingtimes }" />
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
export default {
  components: {
    WorkingtimeLineChart,
    WorkingtimeBarChart,
    WorkingtimeDoughnutChart,
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

    return { startFilter, endFilter };
  },
  methods: {
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
          this.workingtimes = res.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
