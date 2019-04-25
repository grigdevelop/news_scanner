(function(){
    angular.module('scanner.services')
        .factory('sourcesService', ['requestService', function(requestService){
            var service = { };

            service.getAll = function(){
                return requestService.post('/sources/');
            };

            service.create = function(source){
                return requestService.post('/sources/create', { source });
            };

            return service;
        }]);
})();