var application = require("express")(),
  fs = require("fs"),
  server;

application.use(function (request, response, next) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST");
  next();

});

application.route("/move-down")
  .post(function (request, response) {

    servoblaster.write("5=-10");

    servoblaster.on("error", function (exception) {

      response.status(500).json(exception);

    });

    response.json(true);

  });

application.route("/move-left")
  .post(function (request, response) {

    servoblaster.write("6=-10");

    servoblaster.on("error", function (exception) {

      response.status(500).json(exception);

    });

    response.json(true);

  });

application.route("/move-right")
  .post(function (request, response) {

    servoblaster.write("6=+10");

    servoblaster.on("error", function (exception) {

      response.status(500).json(exception);

    });

    response.json(true);

  });

application.route("/move-up")
  .post(function (request, response) {

    var servoblaster = fs.createWriteStream("/dev/servoblaster");

    servoblaster.write("5=+10\n");

    servoblaster.on("error", function (exception) {

      response.status(500).json(exception);

    });

    servoblaster.end();

    console.log("moved-up");

    response.json(true);

  });

server = application.listen(8000, function () {

  console.log("API Listening on 8000");

});
