<script>
//import moment from 'moment'
import { useRoute } from "vue-router";
//import CurrentWeather from "CurrentWeather";
//import axios from 'axios'


export default {
  city: "",
  methods: {
    getForecastWeather() {
      // Mock
      return [
        {
          'date' : '2021-01-01',
          'temperature' : 15 
        },
        {
          'date' : '2021-01-02',
          'temperature' : 16 
        } 
      ]
    }
  },
  mounted() {
    const route = useRoute();
    const cityParameter = route.params.cityParameter;
    this.city = cityParameter;
  }
}
</script>

<template>
  <div id="ForecastWeather">
    <chart-maker>
      <tr v-for="(data) in getForecastWeather()" :key="data.name">
        <td>{{data.date}}&nbsp;{{data.temperature}}</td>
      </tr>
    </chart-maker>
  </div >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
