angular.module('WeatherApp.controllers.Main', [])

.controller('MainController', function($scope,$rootScope,SharedState,EventService, CustomerService ){
    $scope.title= "Clinical Meeting";
    SharedState.initialize($scope, 'modal1');
    SharedState.initialize($scope, 'modal2');
    SharedState.initialize($scope, 'uiSidebarRight');
    //SharedState.turnOn('modal1');

    $scope.waiting= function (){
        SharedState.turnOn('modal2')

    }
    $scope.getUser= function (){
        return  $rootScope.username;
    }

    $scope.myEvents = [
        {name: 'Crossfit', online: true, time: "10:30"},
        {name: 'Zumba', online: true,time: "11:00"},
        {name: 'Pesas', online: true,time: "1:00"},
        {name: 'Correr', online: false,time: "3:00"},

      ];

      $scope.getEventsFromCustomer =   function () {
        CustomerService.getEventsFromCustomer()
          .then(
          function (myEvents) {
            $scope.myEvents = myEvents.res;
          });
      };

      $scope.getRole= function (){
          return $rootScope.role;
      }


     // $scope.getEventsFromCustomer();

 
  
});