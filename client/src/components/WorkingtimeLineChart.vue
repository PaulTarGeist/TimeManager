<template>
  <div>
    <canvas id="workingtime-line-chart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
import workingtimeLineChartData from "../chart/workingtime-line-data.js";
import { initChart } from "../utils/chart.js";

export default {
  name: "WorkingtimeLineChart",
  props: { workingtimes: Object },
  updated() {
    this.$nextTick(function () {
      let { workingtimes } = this.workingtimes;
      initChart(workingtimes.data, workingtimeLineChartData);
      new Chart("workingtime-line-chart", workingtimeLineChartData);
    });
  },
};
</script>

<style scoped></style>
