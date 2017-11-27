'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myappApp
 */

angular.module('WeatherApp.controllers.Login',[])
  .controller('LoginCtrl', function ($scope, LoginService, $location,$rootScope,SharedState) {

    // variables
    $scope.title = "Clinical Meeting";
    $scope.user = { username: "andres", password: "andres" };
    SharedState.initialize($scope, 'modal2');

    // methods

    $scope.submitForm = function (isValid) {
      if (isValid) {
        $scope.signIn();
      }
    };

    $scope.goRegisterCustomer= function (){
      $location.path('/addCustomer')

    }


    $scope.signIn =  function ()  {
        SharedState.turnOn('modal2');
      LoginService.authenticate($scope.user).then(
        function (response){
            SharedState.turnOff('modal2');
          if(response.type=="error"){
            alert(response.message);
          }
          else if(response.type=="success"){
              alert("Fue exitoso");
            console.log(response);
            $rootScope.token= response.token;
             $rootScope.username= response.username;
             $rootScope._id= response._id;
             $rootScope.role= response.role;
             $location.path('/')
          }

         
        }
      )};

  });
  