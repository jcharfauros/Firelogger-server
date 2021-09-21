require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let fetch = require("node-fetch"); //NEW

let user = require("./controllers/userController");
let inventory = require("./controllers/inventoryController");
const { response, request } = require("express");

sequelize.sync();

app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/user", user); //no validation route, will probably not use - jdc
app.use("/inventory", inventory);

// ADDING NEW ENDPOINT FOR HOTEL FETCH BELOW
app.get("/hotels", async (req, res) => {
  let apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?radius=5000&language=en&query=hotel&key=${apiKey}`;

  let response = await fetch(url);
  let data = await response.json();
  res.json(data);
});

// ADDING NEW ENDPOINT FOR PET LODGING FETCH BELOW
app.get("/petcare", async (req, res) => {
  let apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?radius=5000&language=en&query=petboarding&key=${apiKey}`;

  let response = await fetch(url);
  let data = await response.json();
  res.json(data);
});

app.listen(3000, function () {
  console.log("App is listening intently on port 3000");
});
