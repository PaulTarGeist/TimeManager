<template>
  <div>
    <canvas id="workingtime-doughnut-chart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
import workingtimeDoughnutChartData from "../chart/workingtime-doughnut-data.js";
import { initChart } from "../utils/chart.js";

export default {
  name: "WorkingtimeDoughnutChart",
  props: { workingtimes: Object },
  updated() {
    this.$nextTick(function () {
      let { workingtimes } = this.workingtimes;
      initChart(workingtimes.data, workingtimeDoughnutChartData);
      new Chart("workingtime-doughnut-chart", workingtimeDoughnutChartData);
    });
  },
};
</script>

<style scoped></style>
