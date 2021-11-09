<template>
  <div class="chart">
    <canvas
      style="height: 40vh; width: 80vw"
      id="workingtime-bar-chart"
    ></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
import workingtimeBarChartData from "../../utils/charts/workingtime-bar-data";
import { initChart } from "../../utils/charts/chart";

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
