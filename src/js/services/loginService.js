angular.module('WeatherApp.services.Login', [])
.service("LoginService",
function( $http, $q, $rootScope) {
   
    function authenticate( user ) {
       // alert($rootScope.apiUrl);
     
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl+"login/",
            data: {
                username: user.username,
                password: user.password
            },
            timeout : 3000, 
        
        });  
        return( request.then( handleSuccess, handleError ).catch(function (e){ alert(e)}));
    
    }

      function logout( user ) {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl+"logout/",
            data: {
                name: $rootScope.username
            },
            timeout : 3000, 
            
            });  
            return( request.then( handleSuccess, handleError ).catch(function (e){ alert(e)}));
    }

    // ---
    // PRIVATE METHODS.
    // ---
    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError( response ) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
        return( response.data );
    }
     // Return public API.
    return({
        authenticate: authenticate,
        logout:logout
    });
}) ;