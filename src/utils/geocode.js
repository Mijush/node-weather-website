const request = require("postman-request");
const geoCode = (adress, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1Ijoia3JpczEyMy0iLCJhIjoiY2w0Y2h2Y2xzMXczcDNlbXMxOHBkNjZoaSJ9.0uqOM913F8Kmdfa1hUiGHw&limit=1`;

  request.get({ url: geocodeURL, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to geocoding!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location!", undefined);
    } else {
      const { place_name, geometry } = body.features[0];
      callback(undefined, {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
        location: place_name,
      });
    }
  });
};

module.exports = geoCode;
