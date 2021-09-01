const Sequelize = require("sequelize");
const sequelize = new Sequelize("firelogger", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to FireLogger postgres database");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
