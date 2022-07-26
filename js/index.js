"use strict";

//* DONE:  Store fetched data in classes (value, unit, timestamp)
//* DONE:  Implement function in classes (get value, get unit, get time, get data, get htmlString)
//* DONE:  convert time and date to string
//* DONE:  put data in table
// TODO:  Show selected data in graph
// TODO:  apply filter to data
// TODO:  Get new table/graph after filtering

// ! ----------------15/08 23:59----------------

// ? Json structure
// ?"uuid": "a528e2fe-c699-4f40-99b9-066a28e33d32",
// ?"value": 1.7357091846572281,
// ?"type": "VOC", (== unit)
// ?"timestamp": 1656600000

const app = {
  measurements: [], //? all measurements
  filtered: ["CO2", "VOC", "PM25", "PM10"], //? unit/type
  selectedMeasurement: "all",

  init() {
    console.log("int");
    this.fetchData();
    this.filter();
    this.renderChart();
    this.render();

    // console.log(this.measurements);
  },

  fetchData() {
    fetch("https://thecrew.cc/herexamen/measurements.json")
      .then((res) => res.json())

      .then((data) => {
        data.measurements.map((mapped) => {
          this.measurements.push(mapped.value);
          class Measurements {
            constructor(value, type, timestamp) {
              this._value = value;
              this._unit = type;
              this._timestamp = timestamp;
            }

            //! unit will be the filter criteria
            //! unit == type in json format
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
              return new Date(this._timestamp * 1000).toLocaleDateString(
                "nl-BE"
              );
            }

            get htmlstring() {
              return `
                <tr>
                <td>${getData.unit}</td>
                <td>${getData.value}</td>
                <td>${getData.date + " " + getData.time}</td>
                </tr>`;
            }
          }

          const getData = new Measurements(
            mapped.value,
            mapped.type,
            mapped.timestamp
          );
          // console.log(add);

          const tableHtml = document.getElementById("measurements");
          tableHtml.innerHTML += getData.htmlstring;
          // let testing = this.measurements.push("a", "b");
          // console.log(this.measurements.length);
        });
      });
    //   this.measurements.push(1, 2, 3, "4");

    // .catch((error) => {
    //   console.error(error);
    // }),
  },

  // Apply filter = make new render of chart & table
  filter() {
    let filter = this.filtered;
    // console.dir(filter);
  },

  //render chart (Libary)
  renderChart() {
    var logger;
    logger = () => {
      console.log(this.measurements);
      console.log(this.measurements.length);
    };
    setTimeout(logger, 1000);

    console.log(this.measurements.length);
    // X = time
    var xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

    setTimeout(() => {
      const ctx = document.getElementById("chart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              label: "CO2",
              data: [this.measurements],
              borderColor: "red",
              fill: false,
            },
            {
              label: "VOC",
              data: this.measurements,
              borderColor: "green",
              fill: false,
            },
            {
              label: "PM25",
              data: this.measurements,
              borderColor: "blue",
              fill: false,
            },
            {
              label: "PM10",
              data: this.measurements,
              borderColor: "yellow",
              fill: false,
            },
          ],
        },
        options: {
          legend: { display: false },
        },
      });
    }, 1000);
  },

  // render table
  render() {},
};

// console.log(app.fetchData);
// console.log(app);

app.init();

//* ------------------------test code------------------------

// const naming = {
//   wheelers() {
//     class Stranger {
//       constructor(name, town, state) {
//         this._name = name;
//         this._town = town;
//         this._state = state;
//       }

//       get name() {
//         return (this._name += " Wheeler");
//       }
//       get location() {
//         return this._town + ", " + this._state;
//       }
//     }

//     const fullName = new Stranger("Mike", "Hawkins", "Indiana");
//     const fullName2 = new Stranger("Nancy", "Hawkins", "Indiana");

//     console.log(fullName._name);
//     console.log(fullName);

//     console.log(fullName);
//     console.log(fullName2);
//     console.log(fullName.name, fullName.location);
//     console.log(fullName.location);
//     console.log(fullName2.name, fullName2.location);
//   },
// };

// naming.wheelers();

//!timestamp is not readable => computer code
// const date = new Date(Date.UTC(2016, 11, 20, 3, 0, 0));

// // formats below assume the local time zone of the locale;
// // America/Los_Angeles for the US

// // US English uses month-day-year order
// console.log(date.toLocaleDateString("nl-BE"));
// // → "20/12/2012"

// const timestamp = 1656875880;

// //* date
// const converted = new Date(timestamp * 1000);
// console.log(converted.toLocaleDateString("nl-BE"));

// //*time
// const time = new Date(timestamp * 1000);
// let convertion = time.toLocaleString("nl-BE", { timeStyle: "short" });
// console.log(convertion);
