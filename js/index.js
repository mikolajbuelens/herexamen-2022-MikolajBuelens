"use strict";

//* DONE:  Store fetched data in classes (value, unit, timestamp)
//* DONE:  Implement function in classes (get value, get unit, get time, get data, get htmlString)
//* DONE:  convert time and date to string
//* DONE:  put data in table
//* DONE:  apply filter to data
//* DONE:  Get new table/graph after filtering

//  TODO: fix split (line: 166)
//  TODO:  display values in graph by label
//  TODO:  Get month value from api objects and update graph accordingly
//  TODO:  Catch errors in fetchData

// ! ----------------15/08 23:59----------------

// ? Json structure
// ?"uuid": "a528e2fe-c699-4f40-99b9-066a28e33d32",
// ?"value": 1.7357091846572281,
// ?"type": "VOC", (== unit)
// ?"timestamp": 1656600000

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
  measurements: [], //? all measurements
  filtered: [], //? unit/type
  selectedMeasurement: "all",

  init() {
    console.log("int");
    this.fetchData();
    this.filter();
    this.render();
  },

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

  // Apply filter = make new render of chart & table
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
    // this.renderChart("CO2");

    setTimeout(() => {
      if (
        this.selectedMeasurement === "all" ||
        this.selectedMeasurement === "CO2"
      ) {
        myChart.setDatasetVisibility(0, true);
      } else {
        myChart.setDatasetVisibility(0, false);
      }
      if (
        this.selectedMeasurement === "all" ||
        this.selectedMeasurement === "VOC"
      ) {
        myChart.setDatasetVisibility(1, true);
      } else {
        myChart.setDatasetVisibility(1, false);
      }
      if (
        this.selectedMeasurement === "all" ||
        this.selectedMeasurement === "PM25"
      ) {
        myChart.setDatasetVisibility(2, true);
      } else {
        myChart.setDatasetVisibility(2, false);
      }
      if (
        this.selectedMeasurement === "all" ||
        this.selectedMeasurement === "PM10"
      ) {
        myChart.setDatasetVisibility(3, true);
      } else {
        myChart.setDatasetVisibility(3, false);
      }
      myChart.update();
    }, 100);
  },
  //render chart (Library)
  renderChart(type, arr) {
    // let splitter = this.measurements.map((m) => {
    //   m.date = m.date.split("/");
    //   return m;
    // });
    // console.log(splitter);
    setTimeout(() => {
      for (let i = 5; i < 12; ) {
        i++;
        i = i.toString();

        //! need to fix split
        // let split = this.measurements.map((m) => m.date.split("/"));
        // let months = split.filter(m => m[1] === i);
        // console.log(months);

        // console.log(split);

        // console.warn(this.measurements);

        // let date = "01/11/2016";

        // var arr2 = date.split("/");

        // console.log(arr2[1]);

        // let testSplit = this.measurements.forEach((s) => s.date.split("/"));
        // let monthTest =  testSplit.filter((y) =>console.log( y.date[1]) === i);
        // console.log(testSplit);
        // console.log(monthTest);

        // let split = this.date.split;

        // let splitter = this.measurements.map((mapped) => mapped.date.split("/"));
        // let month = splitter.filter((m) => m[1] === i);
        // console.log(month);
        let testMonth = this.measurements.filter((f) => f.date[1] === i);

        // let month = testMonth.filter((f) => f.date[1] === i);
        let unit = testMonth.filter((u) => u.unit === type);
        // console.log(unit);
        let reduced = unit.reduce((a, b) => {
          return a + b.value;
        }, 0);
        // console.log(reduced);
        arr.push(reduced);
        // console.log(reduced);
      }
    }, 100);
  },

  render() {
    setTimeout(() => {
      
   
    document.getElementById("measurements").innerHTML = ``;
    this.filtered.forEach(
      (x) => (document.getElementById("measurements").innerHTML += x.htmlstring)
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

  // console.log(this.measurements);
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
