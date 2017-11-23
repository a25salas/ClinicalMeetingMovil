angular.module('WeatherApp.controllers.Qr', [])

    .controller('QrCtrl', function ($scope, $rootScope, SharedState, CustomerService, OwnerService) {
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

        $scope.startScan = function () {

            cordova.plugins.barcodeScanner.scan(
                function (result) {

                    OwnerService.getByUserId(result.text).then(function (res) {
                        if (res.type == "success") {
                        
                            var s = "do you want to register to  " + res.res.user.username + "?";
                            var r = confirm(s);
                            if (r == true) {
                                $scope.registerCompany(result.text);
                            } else {

                            }
                        }
                        else if (res.type == "error" || res.type == "exception") {
                            alert(res.message);
                        } 
                    })


                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );

        }


        $scope.registerCompany = function (company_user_id) {
            CustomerService.registerCompany(company_user_id)
                .then(
                function (res) {
                    if (res.type == "success") {
                        alert(res.message);
                    }
                    else if (res.type == "error" || res.type == "exception") {
                        alert(res.message);
                    }
                });
        };

        //$scope.startScan();


    });