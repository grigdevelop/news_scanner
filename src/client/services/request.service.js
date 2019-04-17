(function(){
    angular.module('scanner.services')
        .factory('requestService', ['$http', '$q', function($http, $q){
            var service = { };
            service.baseUrl = '/api';
            service.headers = {
                'Authorization': null
            };

            service.post = function( url, data ){
                var deferred = $q.defer();

                $http.post(service.baseUrl + url, data, { headers: service.headers})
                    .then( function( response ) {
                        deferred.resolve(response.data);
                    }, function ( error ) {
                       deferred.reject(error);
                    });

                return deferred.promise;
            };

            service.setAuthData = function( authData ) {
                service.headers['Authorization'] = 'Bearer ' + authData;
            };

            return service;
        }]);
})();