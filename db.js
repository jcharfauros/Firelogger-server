const Sequelize = require('sequelize');
const sequelize = new Sequelize (
    'firelogger',
    'postgres',
    'password', 
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

sequelize.authenticate().then(
    function() {
        console.log('Woot, connected to firelogger postgres database!');
    },
    function(err) {
        console.log(err);
    }
);

module.exports = sequelize;