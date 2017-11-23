angular.module('WeatherApp.controllers.MyUser', [])

    .controller('MyUserCtrl', function ($scope, $rootScope, $location,SharedState, CustomerService, OwnerService) {
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
        CustomerService.getByUserId($rootScope._id).then(function (res) {
            if (res.type == "success") {
               if(res.user== null){
                $location.path('/login')
               }
                $scope.current= res.user;
                $scope.getEventsFromCustomer();
            }
            else if (res.type == "error" || res.type == "exception") {
                alert(res.message);
            } 
        })
    }

    $scope.getEventsFromCustomer =   function () {
        CustomerService.getEventsFromCustomer()
          .then(
          function (myEvents) {
            $scope.events = myEvents.res;
          });
      };



        $scope.getUserCreedentials();


    });