angular.module('WeatherApp.services.Customer', [])
.service("CustomerService",
function ($http, $q, $rootScope) {

    // ---
    // PUBLIC METHODS.
    // ---
    // I add a friend with the given name to the remote collection.
    function addCustomer(current) {
        console.log(current);
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "customer/create",
            data: {
                user: current.user,
                weight: current.weight,
                registeredCompanies: current.registeredCompanies.map(function(e){ e._id})  // devuelve solo los ID
            },
            timeout : 3000, 
            
            });  
            return( request.then( handleSuccess, handleError ).catch(function (e){ alert(e)}));
    }

    function updateCustomer(current) {
          console.log(current)
        var request = $http({
         
            method: "POST",
            url: $rootScope.apiUrl + "customer/update",
            data: {
                customerId: current.customerId,
                user: current.user,
                weight: current.weight,
                registeredCompanies: current.registeredCompanies.map(function(e){ e._id})  // devuelve solo los ID
            },
            timeout : 3000, 
            
            });  
            return( request.then( handleSuccess, handleError ).catch(function (e){ alert(e)}));;
    }
    // I get all of the friends in the remote collection.
    function getCustomers() {
        var request = $http({
            method: "GET",
            url: $rootScope.apiUrl + "customer/customers",
        });

        return (request.then(handleSuccess, handleError));

    }
    // I remove the friend with the given ID from the remote collection.
    function removeCustomer(current) {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "customer/delete",
            data: {
                _id: current._id
            },
            timeout : 3000, 
            
            });  
            return( request.then( handleSuccess, handleError ).catch(function (e){ alert(e)}));
    }


    function registerCompany(company_user_id) {
        console.log($rootScope._id);
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "customer/registerCompany",
            data: {
                company_user_id: company_user_id,
                customer_id: $rootScope._id
            },
            timeout : 3000, 
            
            });  
            return( request.then( handleSuccess, handleError ).catch(function (e){ alert(e)}));
    }

    function getByUserId(company_user_id) {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "customer/getByUserId",
            data: {
                user: $rootScope._id
            },
            timeout : 3000, 
            
            });  
            return( request.then( handleSuccess, handleError ).catch(function (e){ alert(e)}));
    }
    function getEventsFromCustomer(current) {
        var request = $http({
            method: "POST",
            url: $rootScope.apiUrl + "customer/getEvents",   // se debe cambiar a customer
              data: {
                user_id: $rootScope._id
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
        addCustomer: addCustomer,
        updateCustomer: updateCustomer,
        getCustomers: getCustomers,
        removeCustomer: removeCustomer,
        registerCompany: registerCompany,
        getByUserId:getByUserId,
        getEventsFromCustomer:getEventsFromCustomer
    });
});