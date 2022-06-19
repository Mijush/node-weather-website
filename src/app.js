const path = require("path");

const express = require("express");
const hbs = require("hbs");

const app = express();

const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mijush",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mijush",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Mijush",
  });
});

app.get("/weather", (req, res) => {
  const adress = req.query.adress;
  if (!adress) {
    return res.send({ error: "You must provide an adress!" });
  }
  geocode(adress, (err, data) => {
    if (err) {
      return res.send({ err });
    } else if (!adress || adress.length < 1) {
      return res.send("Please enter an adress!");
    } else {
      forecast(data, (err, forecastData) => {
        if (err) {
          return res.send({ err });
        }
        return res.send({ location: data.location, forecast: forecastData });
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mijush",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mijush",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
