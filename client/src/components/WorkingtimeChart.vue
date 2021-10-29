<template>
    <section>
    <h1>Workingtime Charts</h1>

    <form>
        <div class="form-group">
        <label for="start">Date de début:</label>
        <input type="date" id="start" name="start" />
        </div>
        <div class="form-group">
        <label for="end">Date de fin:</label>
        <input type="date" id="start" name="end" />
        </div>
        <div class="form-group">
        <input v-on:click="todo()" class="btn btn-primary mr-1" type="button" value="Rechercher" />
        </div>
    </form>

    <div>
        <canvas id="workingtime-line-chart"></canvas>
    </div>
    <div>
        <canvas id="workingtime-bar-chart"></canvas>
    </div>
        <div>
        <canvas id="workingtime-doughnut-chart"></canvas>
    </div>
    </section>
</template>

<script>
import Chart from 'chart.js'
import workingtimeLineChartData from '../chart/workingtime-line-data.js'
import workingtimeBarChartData from '../chart/workingtime-bar-data.js'
import workingtimeDoughnutChartData from '../chart/workingtime-doughnut-data.js'
import moment from 'moment'

export default {
  name: 'workingtimeChartData',
  data() {
    return {
      workingtimeLineChartData: workingtimeLineChartData,
      workingtimeBarChartData: workingtimeBarChartData,
      workingtimeDoughnutChartData: workingtimeDoughnutChartData
    }
  },
  mounted() {
    let ctxLine     = document.getElementById('workingtime-line-chart');
    let ctxBar      = document.getElementById('workingtime-bar-chart');
    let ctxDoughnut = document.getElementById('workingtime-doughnut-chart');  
    const mock_working_time = [
      {
        'start' : '2021-01-01 09:17:00',
        'end' : '2021-01-01 23:01:00'
      },
        {
        'start' : '2021-01-02 09:30:00',
        'end' : '2021-01-02 23:12:00'
      },
      {
        'start' : '2021-01-03 11:20:00',
        'end' : '2021-01-03 22:25:00'
      },
      {
        'start' : '2021-01-06 08:15:00',
        'end' : '2021-01-06 23:33:00'
      }
    ]
    /**
     * Line Chart
     */
    this.initChart(mock_working_time, this.workingtimeLineChartData)
    new Chart(ctxLine, workingtimeLineChartData);
  
    /**
     * Bar Chart
     */
    this.initChart(mock_working_time, this.workingtimeBarChartData)
    new Chart(ctxBar, workingtimeBarChartData);
    /**
     * Doughnut Chart
     */
    this.initChart(mock_working_time, this.workingtimeDoughnutChartData, true)  
    new Chart(ctxDoughnut, workingtimeDoughnutChartData);
  }, 
  methods: {
    initChart(mock_working_time, chartData, doughnut = false) {
      chartData.data.labels = [];
      mock_working_time.forEach((item) => {
        let start   = moment(item.start);
        let end     = moment(item.end);
        let diff    = moment.duration(end.diff(start));
        let hours   = diff.asHours();
        
        if (doughnut == true) {
          let r = Math.floor(Math.random() * 256);
          let g = Math.floor(Math.random() * 256);
          let b = Math.floor(Math.random() * 256);
          
          chartData.data.datasets[0].backgroundColor.push("rgb("+ r +", "+ g +", "+ b +")");
        }
  
        chartData.data.labels.push(moment(item.start).format('DD/MM/YYYY'));
        chartData.data.datasets[0].data.push(Math.round(hours));
      })
    },
  }
}
</script> 
