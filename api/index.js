var application = require("express")(),
  fs = require("fs"),
  server;

var distance = "5";
var positions = {
  home: {
    "5": "195",
    "6": "120"
  }
};
var servoblaster = fs.createWriteStream("/dev/servoblaster");

servoblaster.on("error", function (exception) {

  console.log("servoblaster error", exception);

});

application.use(function (request, response, next) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST");
  next();

});

application.route("/move-down")
  .post(function (request, response) {

    servoblaster.write("5=-" + distance + "\n");

    console.log("moved-down");

    response.json(true);

  });

application.route("/move-left")
  .post(function (request, response) {

    servoblaster.write("6=-" + distance + "\n");

    console.log("moved-left");

    response.json(true);

  });

application.route("/move-right")
  .post(function (request, response) {

    servoblaster.write("6=+" + distance + "\n");

    console.log("moved-right");

    response.json(true);

  });

application.route("/move-to/:position")
  .post(function (request, response) {

    var keys, position;

    position = positions[request.params.position];

    console.log("position", position);

    Object.keys(position).forEach(function (key) {

      servoblaster.write(key + "=" + position[key] + "\n");

    });

    console.log("moved to ", request.params.position);

    response.json(true);

  });

application.route("/move-up")
  .post(function (request, response) {

    servoblaster.write("5=+" + distance + "\n");

    console.log("moved-up");

    response.json(true);

  });

server = application.listen(8000, function () {

  console.log("API Listening on 8000");

});

function serverClose() {
  "use strict";

  server.close(function () {

    servoblaster.end();

    process.exit();

  });

}

process.on("SIGINT", serverClose);

process.on("SIGTERM", serverClose);
