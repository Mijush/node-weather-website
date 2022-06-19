const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const fetchWeather = (adress) =>
  fetch(`/weather?adress=${adress}`).then((response) => {
    response.json().then((data) => {
      if (data.err) {
        messageOne.textContent = data.err;
      } else {
        messageOne.textContent = data.location;
        const {
          temperature,
          precip,
          weather_descriptions,
          wind_degree,
          wind_speed,
        } = data.forecast;
        const weatherInfo = `The weather today is ${weather_descriptions[0]} with a temperature of ${temperature} and probability ${precip}. The wind is coming from ${wind_degree} degrees and is blowing with a speed of ${wind_speed} km/h.`;

        messageTwo.textContent = weatherInfo;
      }
    });
  });

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = search.value;
  fetchWeather(location);
});
