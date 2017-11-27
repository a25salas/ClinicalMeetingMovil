angular.module('WeatherApp.controllers.Customer',[])
.controller('CustomerCtrl', function ($scope, CustomerService, OwnerService, $routeParams) {
    $scope.title ="Customers";
    $scope.owners = [];
    $scope.customers = [];
    $scope.state = "add";
    $scope.current = {
      "name": "aa",
      "id": -1,
      "registeredCompanies":[]
    };
    $scope.loadRemoteData =  function ()  {
      CustomerService.getCustomers()
        .then(
        function (customers) {
          $scope.customers = customers.res;
          $scope.setEmptyCurrent();
        });
    };

    $scope.loadOwners = function () {
      OwnerService.getOwners()
        .then(
        function (owners) {
          console.log(owners);
          $scope.owners = owners.res;
        });
    };
    $scope.setCurrent = function (e) {
      $scope.state = "update";
      $scope.current = e;
     // $scope.current.registeredCompanies= [];
    }

    $scope.setEmptyCurrent = function (){
      $scope.current = {
        "name": "",
        "id": -1,
        "registeredCompanies":[]
      };
    }

    $scope.changeState = function (e){ $scope.state = "add"};

    $scope.removeCustomer = function (e) {
      CustomerService.removeCustomer(e)
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

    $scope.updateCustomer = function (e) {
      CustomerService.updateCustomer($scope.current)
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

    $scope.addCustomer = function (e) {
      CustomerService.addCustomer($scope.current)
        .then(
        function (res) {
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

     $scope.registerOwner= function (){
      if(!$scope.current.registeredCompanies.find(
          function (e){
              e._id==$scope.data.selectedOwner._id})
        ){
      $scope.current.registeredCompanies.push($scope.data.selectedOwner);
      } else{
        alert("Repeat company");
      }
     }

     $scope.desRegisterOwner= function (_id){
      $scope.current.registeredCompanies = $scope.current.registeredCompanies.filter(
          function (e){ 
              e._id !== _id
          }
        )
     }
     

    // init
    $scope.loadRemoteData();
    $scope.loadOwners();
    //$scope.getOwnerByUsername();

  });
