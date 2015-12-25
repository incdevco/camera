angular.module("application",[])
.constant("NECameraEndpoint", "http:/10.0.0.3:2180")
.constant("NWCameraEndpoint", "http:/10.0.0.3:2080")
.controller("IndexController", [
  "CameraService",
  "NECameraEndpoint",
  "NWCameraEndpoint",
  "$scope",
  function (cameraService, NECameraEndpoint, NWCameraEndpoint, $scope) {
    "use strict";

    var crtl = this;

    this.cameras = [
      {
        endpoint: NECameraEndpoint,
        name: "North East",
        value: "ne"
      },
      {
        endpoint: NWCameraEndpoint,
        name: "North West",
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
      moveUp: function (camera) {

        return $http.post(camera.endpoint + "/move-up");

      }
    };

  }
]);
