"use strict";

// TODO:  Store fetched data in classes (value, unit, timestamp)
// TODO:  Implement function in classes (get value, get unit, get time, get data, get htmlString)
// TODO:  convert time and date to string
// TODO:  put data in table
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
  },

  fetchData() {
    fetch("https://thecrew.cc/herexamen/measurements.json")
      .then((res) => res.json())

      .then((data) => {
        // console.log(data);
        data.measurements.map((mapped) => {
          // console.log(mapped);
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

            //! time and date need to be converted to localstring
            //tijdsstring via `.toLocaleString("nl-BE")`
            //datumstring via `.toLocaleDateString("nl-BE")`
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
                <td>${this._unit}</td>
                <td>${this._value}</td>
                <td>${this._timestamp}</td>
                </tr>`;
            }
          }
          // console.log(mapped.value);
          let table = "";
          document.getElementById("measurements").innerHTML = table;
          const getData = new Measurements(
            mapped.value,
            mapped.type,
            mapped.timestamp
          );
          console.log(
            getData.value,
            getData.unit,
            getData.date + " " + getData.time
          );
          // console.log(typedata);
        });
      });

    // .catch((error) => {
    //   console.error(error);
    // }),
  },

  // Apply filter = make new render of chart & table
  filter() {},
  //render chart (Libary)
  renderChart() {},
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
