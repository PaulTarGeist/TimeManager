<template>
  <div>
    <canvas id="workingtime-bar-chart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
import workingtimeBarChartData from "../chart/workingtime-bar-data.js";
import { initChart } from "../utils/chart.js";

export default {
  name: "WorkingtimeBarChart",
  props: { workingtimes: Object },
  updated() {
    this.$nextTick(function () {
      let { workingtimes } = this.workingtimes;
      initChart(workingtimes.data, workingtimeBarChartData);
      new Chart("workingtime-bar-chart", workingtimeBarChartData);
    });
  },
};
</script>

<style scoped></style>
