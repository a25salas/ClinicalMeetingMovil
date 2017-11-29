angular.module('WeatherApp.controllers.Owner',[]).controller('OwnerCtrl', function ($scope, OwnerService,SharedState) {
    $scope.title = "Owners";
    $scope.owners = [];
    $scope.qrCode = "";
    $scope.roleOptions = [{ value: 2, title: "DOS" }, { value: 1, title: "UNO" }];
    $scope.state = "add";
    $scope.current = {
      "name": "",
      "id": -1
    };
    $scope.loadRemoteData = function () {
      OwnerService.getOwners()
        .then(
        function (owners) {
          $scope.owners = owners.res;
          $scope.setEmptyCurrent();
        });
    };
    $scope.setCurrent =function (e)  {
      $scope.state = "update";
      $scope.current = e;
    }

    $scope.setEmptyCurrent =function ()  {
      $scope.current = {
        "name": "",
        "id": -1
      };
    }

    $scope.changeState = function () { $scope.state = "add"};

    $scope.removeOwner = function (e)  {
      OwnerService.removeOwner(e)
        .then(
        function (res) {
          console.log(res);
          if(res.type=="success"){
            alert(res.message);
          $scope.loadRemoteData();
        }  else if(res.type=="error"||res.type=="exception"){
          alert(res.message);
        }
        });
    };

    $scope.updateOwner = function ()  {
      OwnerService.updateOwner($scope.current)
        .then(
        function (res) {
          console.log(res);
          if(res.type=="success"){
            alert(res.message);
          $scope.loadRemoteData();
        }  else if(res.type=="error"||res.type=="exception"){
          alert(res.message);
        }
          
        });
    };

    $scope.addOwner = function () {
        SharedState.turnOn('modal2');
      OwnerService.addOwner($scope.current)
        .then(
        function (res) {
            SharedState.turnOff('modal2');
          console.log(res);
          if(res.type=="success"){
            alert(res.message);
          $scope.loadRemoteData();
        }
        else if(res.type=="error"||res.type=="exception"){
          alert(res.message);
        }
        });
    };

    $scope.getQrCode = function ()  {
      OwnerService.getQrCode()
        .then(
        function (qr) {
          $scope.qrCode = qr.res;
        });
    };

    // init
    $scope.loadRemoteData();
  });
