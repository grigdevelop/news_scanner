(function(){
    angular.module('scanner.services')
        .factory('authService', ['$q', 'requestService', 'cacheService', function($q, requestService, cacheService){
            var service = {};

            service.isAuthenticated = function(){
                if(cacheService.getData('authData')){
                    return true;
                } else {
                    return false;
                }
            };

            service.login = function(loginData) {
                var deferred = $q.defer();

                requestService.post('/auth/login', loginData)
                    .then(function(response){
                        cacheService.setData('authData', response.user);
                        deferred.resolve(response);
                    })
                    .catch(function(error){
                       deferred.reject(error);
                    });

                return deferred.promise;
            };

            service.logout = function(){
              cacheService.removeData('authData');
            };

            service.getCurrentUser = function(){
                var deferred = $q.defer();

                var authData = cacheService.getData('authData');
                if( !authData ) {
                    var error = new Error('User not authorized');
                    deferred.reject(error); // TODO:
                    return deferred.promise;
                }

                requestService.post('/auth/validate', { user: authData})
                    .then(function(response) {
                        deferred.resolve(response.user);
                    })
                    .catch(function(error){
                       deferred.reject(error);
                    });

                return deferred.promise;
            };

            return service;

        }]);
})();