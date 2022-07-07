"use strict";

// TODO:  Store fetched data in classes (value, unit, timestamp)
// TODO:  Implement function in classes (get value, get unit, get time, get data, get htmlString)
// TODO:  convert time and date to string
// TODO:  put data in table
// TODO:  Show selected data in graph
// TODO:  apply filter to data
// TODO:  Get new table/graph after filtering

// ! ----------------15/08 23:59----------------

const app = {
  measurements: [],
  filtered: [],
  selectedMeasurement: "all",
  init() {
    console.log("int");
    this.fetchData();
  },

  fetchData() {
    fetch("https://thecrew.cc/herexamen/measurements.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.measurements[0].type);
        // data.map((mappedData) => {
        //   console.log(mappedData);
        // });

        // ? Json structure
        // ?"uuid": "a528e2fe-c699-4f40-99b9-066a28e33d32",
        // ?"value": 1.7357091846572281,
        // ?"type": "VOC", (== unit)
        // ?"timestamp": 1656600000

        class Table {
          constructor(value, unit, timestamp) {
            this.data.value = value;
            this.unit = unit;
            this.timestamp = timestamp;
          }
          get unit() {
            console.log(this.unit);
            return this.measurements[this.unit];
          }

          get value() {}

          get time() {}

          get date() {}

          get htmlstring() {}
        }
      });
  },
  filter() {},
  renderChart() {},
  render() {},
};

app.init();
