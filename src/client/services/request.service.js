(function(){
    angular.module('scanner.services')
        .factory('requestService', ['$http', '$q', 'cacheService', function($http, $q, cacheService){
            var service = { };
            service.baseUrl = '/api';

            service.post = function( url, data ){
                var deferred = $q.defer();

                var headers = service.getAuthHeaders();

                $http.post(service.baseUrl + url, data, { headers: headers})
                    .then( function( response ) {
                        deferred.resolve(response.data);
                    }, function ( error ) {
                       deferred.reject(error);
                    });

                return deferred.promise;
            };

            service.setAuthData = function( authData ) {
                cacheService.setData('authData', authData);
            };

            service.getAuthHeaders = function(){
                var headers = {};
                var authData = cacheService.getData('authData');
                if( !authData ) return headers;

                headers['Authorization'] = 'Bearer ' + authData;
                return headers;
            };

            return service;
        }]);
})();