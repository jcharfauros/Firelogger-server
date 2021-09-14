<<<<<<< HEAD
module.exports = function (req, res, next){

    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
    next();
  };
=======
module.exports = function (req, res, next) {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE");
  res.header(
    "access-control-allow-headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
};
>>>>>>> 3ff8fe6592634abc95ee90d812447c9e930e0662
