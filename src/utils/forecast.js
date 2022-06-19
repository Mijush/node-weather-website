const request = require("postman-request");

const forecast = ({ latitude, longitude }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2bcff4e8b727959c3ef18f2f516e2ab2&query=${encodeURIComponent(
    latitude + "," + longitude
  )}`;
  request.get({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      const {
        temperature,
        precip,
        weather_descriptions,
        wind_speed,
        wind_degree,
      } = body.current;

      callback(undefined, {
        temperature,
        precip,
        weather_descriptions,
        wind_degree,
        wind_speed,
      });
    }
  });
};

module.exports = forecast;
