(function(){
    var scannerApp = angular.module('scanner', ['ngRoute', 'scanner.components', 'scanner.services']);
    angular.module('scanner.components', []);
    angular.module('scanner.services', []);

    scannerApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/'});
    }])

})();