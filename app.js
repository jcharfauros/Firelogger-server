require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let user = require("./controllers/userController");
let inventory = require("./controllers/inventoryController");

sequelize.sync();

app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/user", user); //no validation route, will probably not use - jdc
app.use("/inventory", inventory);

app.listen(3000, function () {
  console.log("App is listening intently on port 3000");
});
