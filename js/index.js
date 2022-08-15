"use strict";

// Store API data with getters within class Measurements
class Measurements {
  constructor(value, type, timestamp) {
    this._value = value;
    this._unit = type;
    this._timestamp = timestamp;
  }

  get unit() {
    return this._unit;
  }

  get value() {
    return this._value;
  }

  get time() {
    return new Date(this._timestamp * 1000).toLocaleString("nl-BE", {
      timeStyle: "short",
    });
  }

  get date() {
    return new Date(this._timestamp * 1000)
      .toLocaleDateString("nl-BE")
      .split("/");
  }

  get htmlstring() {
    return `
      <tr>
      <td>${this.unit}</td>
      <td>${this.value}</td>
      <td>${this.date.join("/")} ${this.time}</td>
      </tr>`;
  }
}

const app = {
  measurements: [],
  filtered: [],
  selectedMeasurement: "all",

  init() {
    this.fetchData();
    this.filter();
    this.render();
  },

  // Fetch data and put in class Measurements
  fetchData() {
    fetch("https://thecrew.cc/herexamen/measurements.json")
      .then((res) => res.json())
      .then((data) =>
        data.measurements.forEach((object) => {
          this.measurements.push(
            new Measurements(object.value, object.type, object.timestamp)
          );
        })
      );
  },

  // check HTML dropdown value and apply to selectedMeasurement
  filter() {
    if (this.selectedMeasurement === "all") {
      this.filtered = this.measurements;
    } else {
      this.filtered = this.measurements.filter(
        (x) => x.unit === this.selectedMeasurement
      );
    }
    this.render();
    this.selectedMeasurement = document.getElementById("typeFilter").value;

    const option = this.selectedMeasurement; // Better readability

    setTimeout(() => {
      if (option === "all" || option === "CO2") {
        myChart.show(0);
      } else {
        myChart.setDatasetVisibility(0, false);
      }
      if (option === "all" || option === "VOC") {
        myChart.show(1);
      } else {
        myChart.setDatasetVisibility(1, false);
      }
      if (option === "all" || option === "PM25") {
        myChart.show(2);
      } else {
        myChart.setDatasetVisibility(2, false);
      }
      if (option === "all" || this.selectedMeasurement === "PM10") {
        myChart.show(3);
      } else {
        myChart.setDatasetVisibility(3, false);
      }
      myChart.update();
    }, 500);
  },

  // Reduces values and pushes them in the chart by unit and month
  renderChart(type, arr) {
    setTimeout(() => {
      for (let i = 5; i < 12; ) {
        i++;
        i = i.toString();

        const month = this.measurements.filter((f) => f.date[1] === i);

        const unit = month.filter((u) => u.unit === type);
        const reduced = unit.reduce((a, b) => {
          return a + b.value;
        }, 0);
        arr.push(reduced);
      }
    }, 100);
  },

  // put class data inside table and apply possible filter on change event
  render() {
    setTimeout(() => {
      document.getElementById("measurements").innerHTML = ``;
      this.filtered.forEach(
        (x) =>
          (document.getElementById("measurements").innerHTML += x.htmlstring)
      );
      document.getElementById("typeFilter").onchange = () => {
        this.selectedMeasurement = document.getElementById("typeFilter").value;
        this.filter();
      };
    }, 100);
  },
};

const arr1 = [];
const arr2 = [];
const arr3 = [];
const arr4 = [];
app.renderChart("CO2", arr1);
app.renderChart("VOC", arr2);
app.renderChart("PM25", arr3);
app.renderChart("PM10", arr4);
console.log(arr1);

const data = {
  labels: [
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      //? [june: value, july:value,.....]
      label: "CO2",
      data: arr1,
      borderWidth: 1,
      backgroundColor: "rgba(0, 127, 255, 0.3)",
      borderColor: "rgba(0, 127, 255, 1)",
    },
    {
      label: "VOC",
      data: arr2,
      borderWidth: 1,
      backgroundColor: "rgba(221, 5, 49, 0.3)",
      borderColor: "rgba(221, 5, 49, 1)",
    },
    {
      label: "PM25",
      data: arr3,
      borderWidth: 1,
      backgroundColor: "rgba(249, 230, 79, 0.3)",
      borderColor: "rgba(249, 230, 79, 1)",
    },
    {
      label: "PM10",
      data: arr4,
      borderWidth: 1,
      backgroundColor: "rgba(25, 227, 89, 0.3)",
      borderColor: "rgba(25, 227, 89, 1)",
    },
  ],
};
const config = {
  type: "bar",
  data,

  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const myChart = new Chart(document.getElementById("chart"), config);

app.init();
