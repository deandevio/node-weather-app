const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url =
    `http://api.weatherstack.com/current?access_key=569b287b6d7287c77aeb3a73cd783eef&query=` +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to service", undefined);
    } else if (body.error) {
      callback("Something went wrong, try different input", undefined);
    } else {
      callback(
        undefined,
        "Observation time: " +
          body.current.observation_time +
          " - It is currently " +
          body.current.temperature +
          " degrees out" +
          " but it feels like " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
