require("dotenv").config();
let express = require("express");
let app = express();
const sequelize = require("./db");
app.use(express.json());

let user = require("./controllers/userController");
let inventory = require("./controllers/inventoryController");

sequelize.sync();
//sequelize.sync({force: true})

app.use(require("./middleware/headers"));
app.use(express.json());

app.use("/user", user);
app.use("/inventory", inventory);

app.listen(3000, function () {
  console.log("Firelogger App is listening on port 3000");
});
