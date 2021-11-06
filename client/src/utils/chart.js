import moment from "moment";

export function initChart(workingtimes, chartData) {
  chartData.data.labels = [];
  chartData.data.datasets[0].data = [];
  workingtimes.forEach((item) => {
    let start = moment(item.start);
    let end = moment(item.end);
    let diff = moment.duration(end.diff(start));
    let hours = diff.asHours();
    chartData.data.labels.push(moment(item.start).format("DD/MM/YYYY"));
    chartData.data.datasets[0].data.push(Math.round(hours));
  });
}
