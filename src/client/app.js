(function(){
    var scannerApp = angular.module('scanner', ['ngRoute', 'scanner.components', 'scanner.services']);
    angular.module('scanner.components', []);
    angular.module('scanner.services', []);

    scannerApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/'});
    }]);

    scannerApp.run(['$rootScope', '$route', '$location', '$q', 'authService', appStart]);
    function appStart($rootScope, $route, $location, $q, authService){

        $rootScope.logout = function(){
            authService.logout();
            $rootScope.user = null;
            $location.path('/login');
        };

        $rootScope.login = function(){
            $location.path('/login');
        };

        for(var routeKey in $route.routes){
            var route = $route.routes[routeKey];

            if( !route.auth ) {
                route.resolve = {
                    validate: function(){
                        return true;
                    }
                };
                continue;
            }
            route.resolve = {
                validate: function(){
                    var deferred = $q.defer();

                    authService.getCurrentUser()
                        .then(function(user){
                            $rootScope.user = user;
                            deferred.resolve();
                        })
                        .catch(function(error){
                            $rootScope.user = null;
                            $location.path('/login');
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }
            };

        }
    }
})();