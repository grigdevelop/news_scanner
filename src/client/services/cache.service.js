(function(){
    angular.module('scanner.services')
        .factory('cacheService', ['$window', function($window){
            var service = { };

            service.setData = function(key, data) {
                var jsonData = JSON.stringify(data);
                $window.localStorage.setItem(key, jsonData);
            };

            service.removeData = function(key) {
                $window.localStorage.removeItem(key);
            };

            service.getData = function(key) {
                var jsonData = $window.localStorage.getItem(key);
                if( !jsonData ) return null;

                return JSON.parse(jsonData);
            };

            return service;
        }]);
})();