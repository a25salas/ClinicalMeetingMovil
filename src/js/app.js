angular.module('WeatherApp', [
  'ngRoute',
  'mobile-angular-ui',
  'WeatherApp.controllers.Main',
  'WeatherApp.controllers.Login',
  'WeatherApp.controllers.Customer',
  'WeatherApp.controllers.EventCustomer',
  'WeatherApp.controllers.EventOwner',
  'WeatherApp.controllers.Qr',
  'WeatherApp.controllers.MyUser',
  'WeatherApp.controllers.MyUserOwner',
  'WeatherApp.services.Login',
  'WeatherApp.services.Event',
  'WeatherApp.services.Customer',
  'WeatherApp.services.Owner',
  'mobile-angular-ui.core.sharedState',
  'mobile-angular-ui.gestures'
])
.run(function ($rootScope) {
  $rootScope.apiUrl = "http://localhost:3100/"; 
  // $rootScope.apiUrl = "http://13.58.32.204:3100/"; 
  $rootScope.token = "";
  $rootScope.username = "N/A";
  $rootScope.role = -1;
})
.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
  $routeProvider.when('/login', {templateUrl: 'login.html', reloadOnSearch: false, controller: 'LoginCtrl',
  controllerAs: 'login'});
  $routeProvider.when('/event', {templateUrl: 'event.html', reloadOnSearch: false, controller: 'EventOwnerCtrl',
  controllerAs: 'event'});
  $routeProvider.when('/addEvent', {templateUrl: 'addEvent.html', reloadOnSearch: false, controller: 'EventOwnerCtrl',
  controllerAs: 'event',reload: false});
  $routeProvider.when('/addCustomer', {templateUrl: 'addCustomer.html', reloadOnSearch: false, controller: 'CustomerCtrl',
  controllerAs: 'event',reload: false});
  $routeProvider.when('/registerEvent', {templateUrl: 'registerEvent.html', reloadOnSearch: false, controller: 'EventCustomerCtrl',
  controllerAs: 'event',reload: false});
  $routeProvider.when('/scanQr', {templateUrl: 'qr.html', reloadOnSearch: false,controller: 'QrCtrl',
  controllerAs: 'qr',reload: false});
  $routeProvider.when('/myUser', {templateUrl: 'myUser.html', reloadOnSearch: false,controller: 'MyUserCtrl',
  controllerAs: 'myUser',reload: false});
  $routeProvider.when('/myUserOwner', {templateUrl: 'myUserOwner.html', reloadOnSearch: false,controller: 'MyUserOwnerCtrl',
  controllerAs: 'myUserOwner',reload: false});
}).directive('dragToDismiss', function($drag, $parse, $timeout) {
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem) {
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if (drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function() {
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
}).directive('dragMe', ['$drag', function($drag) {
  return {
    controller: function($scope, $element) {
      $drag.bind($element,
        {
          //
          // Here you can see how to limit movement
          // to an element
          //
          transform: $drag.TRANSLATE_INSIDE($element.parent()),
          end: function(drag) {
            // go back to initial position
            drag.reset();
          }
        },
        { // release touch when movement is outside bounduaries
          sensitiveArea: $element.parent()
        }
      );
    }
  };
}]);
