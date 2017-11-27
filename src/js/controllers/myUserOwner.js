angular.module('WeatherApp.controllers.MyUserOwner', [])

    .controller('MyUserOwnerCtrl', function ($scope, $rootScope, $location,SharedState, OwnerService) {
        $scope.title = "Clinical Meeting";
        SharedState.initialize($scope, 'modal1');
        SharedState.initialize($scope, 'modal2');
        SharedState.initialize($scope, 'uiSidebarRight');
        //SharedState.turnOn('modal1');

        $scope.waiting = function () {
            SharedState.turnOn('modal2')

        }
        $scope.getUser = function () {
            return $rootScope.username;
        }


        $scope.getUserCreedentials= function (){
            OwnerService.getByUserId($rootScope._id).then(function (res) {
            if (res.type == "success") {
               if(res.res== null){
                $location.path('/login')
               }
                $scope.current= res.res;
                $scope.getEventsFromCustomer();
            }
            else if (res.type == "error" || res.type == "exception") {
                alert(res.message);
            } 
        })
    }

    $scope.getCustomersById =   function () {
        OwnerService.getCustomersById()
          .then(
          function (customers) {
            $scope.customers = customers.res;
          });
      };

      $scope.getEventsById =   function () {
        OwnerService.getEventsById()
          .then(
          function (events) {
            console.log(events.res);
            $scope.events = events.res;
          });
      };




        $scope.getUserCreedentials();
        $scope.getCustomersById();
        $scope.getEventsById();

    });