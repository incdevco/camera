angular.module("application",[])
.constant("NEApiEndpoint", "http://10.0.0.3:2180")
.constant("NWApiEndpoint", "http://10.0.0.3:2080")
.constant("NEStreamEndpoint", "http://10.0.0.3:2188")
.constant("NWStreamEndpoint", "http://10.0.0.3:2088")
.controller("IndexController", [
  "CameraService",
  "NEApiEndpoint",
  "NWApiEndpoint",
  "NEStreamEndpoint",
  "NWStreamEndpoint",
  "$scope",
  function (cameraService,
    NECameraEndpoint,
    NWCameraEndpoint,
    NEStreamEndpoint,
    NWStreamEndpoint,
    $scope) {
    "use strict";

    var crtl = this;

    this.cameras = [
      {
        endpoint: NECameraEndpoint,
        name: "North East",
        positions: [
          "home"
        ],
        stream: NEStreamEndpoint,
        value: "ne"
      },
      {
        endpoint: NWCameraEndpoint,
        name: "North West",
        positions: [
          "home"
        ],
        stream: NWStreamEndpoint,
        value: "nw"
      }
    ];

    this.moveDown = function (camera) {

      cameraService.moveDown(camera);

    };

    this.moveLeft = function (camera) {

      cameraService.moveLeft(camera);

    };

    this.moveRight = function (camera) {

      cameraService.moveRight(camera);

    };

    this.moveTo = function (camera) {

      cameraService.moveTo(camera);

    };

    this.moveUp = function (camera) {

      cameraService.moveUp(camera);

    };

  }
])
.factory("CameraService", [
  "$http",
  function ($http) {
    "use strict";

    return {
      moveDown: function (camera) {

        return $http.post(camera.endpoint + "/move-down");

      },
      moveLeft: function (camera) {

        return $http.post(camera.endpoint + "/move-left");

      },
      moveRight: function (camera) {

        return $http.post(camera.endpoint + "/move-right");

      },
      moveTo: function (camera) {

        return $http.post(camera.endpoint + "/move-to/" + camera.position);

      },
      moveUp: function (camera) {

        return $http.post(camera.endpoint + "/move-up");

      }
    };

  }
]);
