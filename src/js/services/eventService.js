angular.module('WeatherApp.services.Event', [])
.service("EventService",
function ($http, $q, $rootScope) {

    // ---
    // PUBLIC METHODS.
    // ---
    // I add a friend with the given name to the remote collection.
    function addEvent(current) {
        console.log($rootScope._id);
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "event/create",
            data: {
                title: current.title,
                description: current.description,
                className: current.className,
                creator: $rootScope._id,
                icon: current.icon,
                start: current.start,
                end: current.end,
                allDay: current.allDay
            }
        });

        return (request.then(handleSuccess, handleError));
    }

    function updateEvent(current) {
          console.log(current)
        var request = $http({
          
            method: "POST",
            url: $rootScope.apiUrl + "event/update",
            data: {
                _id: current._id,
                title: current.title,
                description: current.description,
                className: current.className,
                creator: $rootScope._id,
                icon: current.icon,
                start: current.start,
                end: current.end,
                allDay: current.allDay
            }
        });
        return (request.then(handleSuccess, handleError));
    }
    // I get all of the friends in the remote collection.
    function getEvents() {
        var request = $http({
            method: "GET",
            url: $rootScope.apiUrl + "event/events",
        });

        return (request.then(handleSuccess, handleError));

    }

       // I get thw probable eevents.
       function getProbableEvents() {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "event/getProbableEvents",
            data: {
                user_id: $rootScope._id,
            }
        });

        return (request.then(handleSuccess, handleError));

    }
    // I remove the friend with the given ID from the remote collection.
    function removeEvent(current) {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "event/delete",
              data: {
                _id: current._id,
            }
        });
        return (request.then(handleSuccess, handleError));
    }

        // I remove the friend with the given ID from the remote collection.
        function registerCustomer(current) {
            var request = $http({
                method: "POST",
                url: $rootScope.apiUrl + "event/registerCustomer",
                  data: {
                    _id: current._id,
                    user_id: $rootScope._id
                }
            });
            return (request.then(handleSuccess, handleError));
        }

            // I remove the friend with the given ID from the remote collection.

    






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
        addEvent: addEvent,
        updateEvent: updateEvent,
        getEvents: getEvents,
        removeEvent: removeEvent,
        registerCustomer:registerCustomer,
        getProbableEvents:getProbableEvents
    });
});