export const workingtimeBarChartData = {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Hours",
          data: [],
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  };

  export default workingtimeBarChartData; 
  