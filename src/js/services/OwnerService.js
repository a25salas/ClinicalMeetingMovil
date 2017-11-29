angular.module('WeatherApp.services.Owner', [])
.service("OwnerService",
function ($http, $q, $rootScope) {

    // ---
    // PUBLIC METHODS.
    // ---

    function addOwner(current) {
        console.log(current);
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "owner/create",
            data: {
                user: current.user
            }
        });

        return (request.then(handleSuccess, handleError));
    }

    function updateOwner(current) {
          console.log(current)
        var request = $http({
          
            method: "POST",
            url: $rootScope.apiUrl + "owner/update",
            data: {
                qrCode: current.qrCode,
                ownerId: current.ownerId,
                user: current.user
            }
        });
        return (request.then(handleSuccess, handleError));
    }
    // I get all of the friends in the remote collection.
    function getOwners() {
        var request = $http({
            method: "GET",
            url: $rootScope.apiUrl + "owner/owners",
        });

        return (request.then(handleSuccess, handleError));

    }
    // I remove the friend with the given ID from the remote collection.
    function removeOwner(current) {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "owner/delete",
            data: {
                _id: current._id
            }
        });
        return (request.then(handleSuccess, handleError));
    }

 
    function getByUserId(e) {
        if(e){
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "owner/getByUserId",
            data: {
                user: e
            }
        });

        return (request.then(handleSuccess, handleError));
    } else{
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "owner/getByUserId",
            data: {
                user: $rootScope._id
            }
        });

        return (request.then(handleSuccess, handleError));

    }
    }

    function getEventsById() {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "owner/getEventsById",
            data: {
                user: $rootScope._id
            }
        });

        return (request.then(handleSuccess, handleError));
    }

    function getCustomersById() {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "owner/getCustomersById",
            data: {
                user: $rootScope._id
            }
        });

        return (request.then(handleSuccess, handleError));
    }


    // ---
    // PRIVATE METHODS.
    // ---
    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError(response) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            !angular.isObject(response.data) ||
            !response.data.message
        ) {
            return ($q.reject("An unknown error occurred."));
        }
        // Otherwise, use expected error message.
        return ($q.reject(response.data.message));
    }
    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) {
        return (response.data);
    }
    // Return public API.
    return ({
        addOwner: addOwner,
        updateOwner: updateOwner,
        getOwners: getOwners,
        removeOwner: removeOwner,
        getByUserId: getByUserId,
        getCustomersById:getCustomersById,
        getEventsById:getEventsById
    });
});