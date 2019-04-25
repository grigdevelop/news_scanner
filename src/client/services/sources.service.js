(function(){
    angular.module('scanner.services')
        .factory('sourcesService', ['requestService', function(requestService){
            var service = { };

            service.getAll = function(){
                return requestService.post('/newsSources/getAll');
            };

            return service;
        }]);
})();