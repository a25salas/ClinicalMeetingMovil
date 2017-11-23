angular.module('WeatherApp.services.Owner', [])
.service("OwnerService",
function ($http, $q, $rootScope) {

    // ---
    // PUBLIC METHODS.
    // ---
    function getByUserId(company_user_id) {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "owner/getByUserId",
            data: {
                user: company_user_id
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
        getByUserId: getByUserId
    });
});