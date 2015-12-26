var application = require("express")(),
  fs = require("fs"),
  server;

application.use(function (request, response, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST");
  next();

});

application.route("/move-down")
  .post(function (request, response) {

    fs.writeFile("/dev/servoblaster", "5=-10", function (exception) {

      if (exception) {

        response.status(500).json(exception);

      } else {

        response.json(true);

      }

    });

  });

application.route("/move-left")
  .post(function (request, response) {

    fs.writeFile("/dev/servoblaster", "6=-10", function (exception) {

      if (exception) {

        response.status(500).json(exception);

      } else {

        response.json(true);

      }

    });

  });

application.route("/move-right")
  .post(function (request, response) {

    fs.writeFile("/dev/servoblaster", "6=+10", function (exception) {

      if (exception) {

        response.status(500).json(exception);

      } else {

        response.json(true);

      }

    });

  });

application.route("/move-up")
  .post(function (request, response) {

    fs.writeFile("/dev/servoblaster", "5=+10", function (exception) {

      if (exception) {

        response.status(500).json(exception);

      } else {

        response.json(true);

      }

    });

  });

server = application.listen(8000, function () {

  console.log("API Listening on 8000");

});
