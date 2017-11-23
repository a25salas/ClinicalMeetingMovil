angular.module('WeatherApp.controllers.EventOwner',[])
.controller('EventOwnerCtrl', function ($scope, $rootScope, EventService, $routeParams,  $location,SharedState) {
  SharedState.initialize($scope, 'modal1');
    SharedState.initialize($scope, 'modal2');
    $scope.title ="Events";
    $scope.events = [];
    $scope.state = "add";
    $scope.roleOptions = [{ value: 2, title: "DOS" }, { value: 1, title: "UNO" }];
    $scope.current = {
      "title": "",
      "_id": -1,
      "start": "",
      "end": ""
    };
    $scope.loadRemoteData = function () {

      if ($rootScope._id == null ){
        $location.path('/login');
      } else{
      EventService.getEvents()
        .then(
        function (events) {
          console.log(events);
          $scope.events = events.res;
          $scope.setEmptyCurrent();
        });
      }
    };

    $scope.getOwnerByUsername = function () {
        EventService.getOwnerByUsername($routeParams.username)
          .then(
          function (res) {
            if(res.type=="success"){
                $scope.owner= res.owner;
                console.log($scope.owner);
            }
            else if(res.type=="error"||res.type=="exception"){
                alert(res.message);
              }
          });
      };

    $scope.setCurrent = function (e)  {
      console.log(e);
      $scope.state = "update";
      $scope.current = e;
    }

    $scope.setEmptyCurrent = function () {
      $scope.current = {
        "title": "",
        "_id": -1,
        "start": "",
        "end": ""
      };
    }

    $scope.changeState = function (e){ $scope.state = "add";}

    $scope.removeEvent =function () {
      EventService.removeEvent($scope.current)
        .then(
        function (res) {
          console.log(res);
          if(res.type=="success"){
            alert(res.message);
            $scope.state= "add";
          $scope.loadRemoteData();
        }  else if(res.type=="error"||res.type=="exception"){
          alert(res.message);
        }
        });
    };


    $scope.updateEvent = function () {
      EventService.updateEvent($scope.current)
        .then(
        function (res) {
          console.log(res);
          if(res.type=="success"){
            alert(res.message);
            $scope.state= "add";
          $scope.loadRemoteData();
        }  else if(res.type=="error"||res.type=="exception"){
          alert(res.message);
        }
          
        });
    };

    $scope.addEvent = function () {
        SharedState.turnOn('modal2');
      EventService.addEvent($scope.current)
        .then(
        function (res) {
            SharedState.turnOff('modal2');
          console.log(res);
          if(res.type=="success"){
            $scope.loadRemoteData();
            alert(res.message);
        
        }
        else if(res.type=="error"||res.type=="exception"){
          alert(res.message);
        
        }
        });
    };

    $scope.registerCustomer = function (e) {
      console.log(e);
      $scope.current = e;
      SharedState.turnOn('modal2');
    EventService.registerCustomer($scope.current)
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
        $scope.loadRemoteData();
      }
      });
  };

    
    // init
    $scope.loadRemoteData();
    //$scope.getOwnerByUsername();

  });