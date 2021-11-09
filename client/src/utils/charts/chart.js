import moment from "moment";

export function initChart(workingtimes, chartData, doughnut = false) {
  chartData.data.labels = [];
  chartData.data.datasets[0].data = [];
  workingtimes.forEach((item) => {
    let start = moment(item.start);
    let end = moment(item.end);
    let diff = moment.duration(end.diff(start));
    let hours = diff.asHours();

    if (doughnut === true) {
      const r = Math.round(Math.random() * 255);
      const g = Math.round(Math.random() * 255);
      const b = Math.round(Math.random() * 255);
      chartData.data.datasets[0].backgroundColor.push(
        "rgb(" + r + ", " + g + ", " + b + ")"
      );
    }

    chartData.data.labels.push(moment(item.start).format("DD/MM/YYYY"));
    chartData.data.datasets[0].data.push(Math.round(hours));
  });
}
