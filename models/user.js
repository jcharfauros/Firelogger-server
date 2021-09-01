//FIRE LOGGER

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // firstnamelastname: { //is this right?
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // }, 9.2.3
  });

  return User;
};
