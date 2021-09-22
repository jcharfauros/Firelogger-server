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

app.use("/user", user);
app.use("/inventory", inventory);

app.get("/hotels", async (req, res) => {
  let apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?radius=5000&language=en&query=hotel&key=${apiKey}`;

  let response = await fetch(url);
  let data = await response.json();
  res.json(data);
});

app.get("/petcare", async (req, res) => {
  let apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?radius=5000&language=en&query=petboarding&key=${apiKey}`;

  let response = await fetch(url);
  let data = await response.json();
  res.json(data);
});

app.listen(process.env.PORT, function () {
  console.log(`App is listening intently on port 3000 ${process.env.PORT}`);
});
