
/*let urlName = "Fritz";
let url = "https://api.agify.io/?name=" + urlName;

fetch(url)
  .then((res) => res.json())
  .then((data) =>
    console.log(data.name + " must be " + data.age + " years old.")
  );
*/

let key = "1d14b7f6fe48130a8dda5e925658331a";
let city = "Essen";
let lat = 51.4698;
let lon = 6.9517;
let temps = [];
let winds = [];
let times = [];
let triple = [];
let res;
let data;

/*
let url =
  "http://api.openweathermap.org/geo/1.0/direct?q= + city + &limit=5&appid=" +
  key;
*/
let url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,&hourly=wind_speed_10m&hourly=temperature_2m";

async function fetchData() {
  try {
    res = await fetch(url);
    data = await res.json();

    temps = data.hourly.temperature_2m.slice(0, 24);
    winds = data.hourly.wind_speed_10m.slice(0, 24);
    times = data.hourly.time.slice(0, 24);

    for (i = 0; i < 24; i++) {
      triple.push([temps[i], winds[i], times[i]]);
    }

    return [temps, winds, times];

  } catch (e) {
    console.error("ERROR " + e);
  }

}

fetchData().then(triple => {
  // console.log(triple);

});