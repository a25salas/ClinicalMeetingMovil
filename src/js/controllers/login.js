'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myappApp
 */

angular.module('WeatherApp.controllers.Login',[])
  .controller('LoginCtrl', function ($scope, LoginService, $location,$rootScope) {

    // variables
    $scope.title = "Clinical Meeting";
    $scope.user = { username: "andres", password: "andres" };

    // methods

    $scope.submitForm = function (isValid) {
      if (isValid) {
        $scope.signIn();
      }
    };

    $scope.signIn =  function ()  {
    console.log("entre");
      LoginService.authenticate($scope.user).then(
        function (response){
          if(response.type=="error"){
            alert(response.message);
          }
          else if(response.type=="success"){
              alert("Fue exitoso");
            console.log(response);
            $rootScope.token= response.token;
             $rootScope.username= response.username;
             $rootScope._id= response._id;
             $location.path('/')
          }

         
        }
      )};

  });
  