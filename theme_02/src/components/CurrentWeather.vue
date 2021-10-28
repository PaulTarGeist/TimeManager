<script>
import moment from 'moment'
import { useRoute } from "vue-router";
// import ForecastWeather from "./ForecastWeather"; @TODO child vs parent, parent vs child, whom keep whom
//import axios from 'axios'

/**
 * Need some hours to have access to API KEY 
 * https://pro.openweathermap.org/data/2.5/forecast/hourly?q={paris}&appid=6d631c6a72713ce1cf5800a62c43a388
 * {"cod":401, "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."}
 */
const mock_temperature = 10
  
export default {
  name:   'CurrentWeather',
  city:   "",
  error:  "",
  data() {
    return {
      cityWeathers : [
        {
            'name' : 'Lyon',
        },
        {
            'name' : 'Angers',
        },
                {
            'name' : 'Paris',
        },
        {
            'name' : 'Villeneuve-lagarenne',
        },
      ],
      city : "",
      error: ""
    }
  },
  mounted() {
    const route = useRoute();
    const cityParameter = route.params.cityParameter;
    this.city = cityParameter;
  },
  methods: {
      refreshCurrentWeather() {
        /**
         * Access to axios promise, mock is using temporatly because of activation time to have an activate API KEY
         * Imagine the call and promise response async in mock_temperature
         */

        // test purpose if no informations
        // @TODO when api key will be available, please use axios promise and modify this part of code
        if (mock_temperature && this.city != 'Angers') {
          this.error = "";
          return mock_temperature;
        }
       
        this.error =  "Impossible de récupérer la météo actuelle à " + this.city
        return false

      },
      getIndexOfSelectedOption() {
        return document.getElementById('cities').selectedIndex;
      },
      getFormatedDate() {
        return moment().format('Do MMMM YYYY')
      }
  }
}
</script>

<template>
  <section>
    <form>
      <div class="form-group">
        <div id="CurrentWeather">
          <h1>Où ?</h1> 
          <select id="cities" v-model="city" class="form-control form-control-lg">
            <option v-for="(data) in cityWeathers" :key="data.name">{{ data.name }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <input v-if="city" v-on:click="refreshCurrentWeather()" class="btn btn-primary mr-1" type="button" value="Météo actuelle" />
        <input v-if="city" v-on:click="refreshCurrentWeather()" class="btn btn-secondary mr-1" type="button" value="Prévision des températures maximales" />
      </div>
    </form>
    <div v-if="refreshCurrentWeather()" class="currentWeather-container">
        <h2>Météo actuelle à {{ city }}</h2><br />
        Température {{ refreshCurrentWeather() }}C°<br /><br />
        Date : {{ getFormatedDate() }}
    </div>
    <div v-if="error" class="currentWeather-container error">
      {{ error }}
    </div>

    <!-- <ForecastWeather /> --> <!-- @TODO -->
  </section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form,
  .currentWeather-container {
    background-color:#eaeaea;
    margin:0;
    padding: 20px;
    margin-bottom:20px;
  }

  .currentWeather-container.error{
    text-align:center;
    color:red;
  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
