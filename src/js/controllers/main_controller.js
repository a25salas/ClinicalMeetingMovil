angular.module('WeatherApp.controllers.Main', [])

.controller('MainController', function($scope,$rootScope,SharedState){
    $scope.title= "Clinical Meeting";
    SharedState.initialize($scope, 'modal1');
    //SharedState.turnOn('modal1');

 
  
});