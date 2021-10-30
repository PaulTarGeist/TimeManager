<template>
    <section>
    <h1>Workingtime Charts</h1>
    <form>
        <div class="form-group">
          <label for="start">Date de début:</label>
          <input type="datetime-local" id="start" name="start" v-model="start" />
        </div>
        <div class="form-group">
          <label for="end">Date de fin:</label>
          <input type="datetime-local" id="end" name="end" v-model="end" />
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
//import { useStore } from "vuex";
//import { computed } from "vue";
import workingtimeLineChartData from '../chart/workingtime-line-data.js'
import workingtimeBarChartData from '../chart/workingtime-bar-data.js'
import workingtimeDoughnutChartData from '../chart/workingtime-doughnut-data.js'
import moment from 'moment'
//import { ref } from "vue";

export default {
  name: 'workingtimeChart',
  data() {
    return {
      workingtimeLineChartData: workingtimeLineChartData,
      workingtimeBarChartData: workingtimeBarChartData,
      workingtimeDoughnutChartData: workingtimeDoughnutChartData
    }
  },
  setup() {
    //const store = useStore();
  },
  mounted() {
    const ctxLine     = document.getElementById('workingtime-line-chart');
    const ctxBar      = document.getElementById('workingtime-bar-chart');
    const ctxDoughnut = document.getElementById('workingtime-doughnut-chart');  
  
    //const store         = useStore();
    //const userId        = 1 // @TODO, get from store obect
    //const start         = ref("");
    //const end           = ref("");
    //store.dispatch("loadWorkingtimes");
    //const workingtimes  = computed(() => store.getters.getWorkingtimes(start, end, userId));


    
    const workingtimes = [
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
    this.initChart(workingtimes, this.workingtimeLineChartData)
    new Chart(ctxLine, workingtimeLineChartData);
  
    /**
     * Bar Chart
     */
    this.initChart(workingtimes, this.workingtimeBarChartData)
    new Chart(ctxBar, workingtimeBarChartData);

    /**
     * Doughnut Chart
     */
    this.initChart(workingtimes, this.workingtimeDoughnutChartData, true)  
    new Chart(ctxDoughnut, workingtimeDoughnutChartData);
  }, 
  methods: {
    initChart(workingtimes, chartData, doughnut = false) {
      chartData.data.labels = [];
      workingtimes.forEach((item) => {
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
