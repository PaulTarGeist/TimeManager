<template>
  <div>
    <h3>Timer</h3>
    <p>timer: {{ timer }}</p>
    <button @click="createTimer" :disabled="stopBtn">Start</button>
    <button @click="stopTimer" :disabled="startBtn">Stop</button>
  </div>
</template>

<script>
import moment from "moment";
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";

export default {
  name: "Clock",
  props: ["userId"],
  setup(props) {
    const store = useStore();
    const lastClock = computed(() => store.getters.getLastClock);
    const startBtn = ref();
    const stopBtn = ref();
    const initTime = moment({ hours: 0, minutes: 0, seconds: 0 }).format(
      "HH:mm:ss"
    );
    const timer = ref(initTime);
    const timerInterval = ref();

    const startTimer = () => {
      return setInterval(() => {
        const clockTime = moment(lastClock.value.time);
        const diff = moment(moment(), "HH:mm:ss").diff(
          moment(clockTime, "HH:mm:ss")
        );
        const duration = moment.duration(diff);

        timer.value = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
      }, 1000);
    };

    watch(lastClock, (curr, prev) => {
      if (!prev && curr.status === true) {
        timerInterval.value = startTimer();
        startBtn.value = false;
        stopBtn.value = true;
      }

      if (curr.status === false) {
        startBtn.value = true;
        stopBtn.value = false;
      }
    });

    onMounted(() => {
      if (lastClock.value && lastClock.value.status === true) {
        timerInterval.value = startTimer();
        startBtn.value = false;
        stopBtn.value = true;
      } else {
        startBtn.value = true;
        stopBtn.value = false;
      }
    });

    const createTimer = () => {
      const clockPayload = {
        userId: props.userId,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
        status: true,
      };

      store.dispatch("createClock", clockPayload);

      timerInterval.value = startTimer();
      startBtn.value = false;
      stopBtn.value = true;
    };

    const stopTimer = () => {
      watch(lastClock, (curr, prev) => {
        const wtPayload = {
          userId: props.userId,
          start: prev.time,
          end: curr.time,
        };

        store.dispatch("createWorkingtime", wtPayload);
      });

      const clockPayload = {
        userId: props.userId,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
        status: false,
      };

      clearInterval(timerInterval.value);
      startBtn.value = true;
      stopBtn.value = false;
      store.dispatch("createClock", clockPayload);

      timer.value = initTime;
    };

    return { timer, startBtn, stopBtn, createTimer, stopTimer };
  },
};
</script>

<style lang="scss" scoped></style>
