const labels = ["January", "February", "March", "April", "May", "June"];
const car = 100;
const house = 200;
const kids = 300;

const data = {
  labels: labels,
  datasets: [
    {
      label: "Budget Breakdown",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [car, house, kids],
    },
  ],
};

const config = {
  type: "pie",
  data: data,
  options: {},
};

const myChart = new Chart(document.getElementById("myChart"), config);
