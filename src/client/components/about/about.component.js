(function(){
    function AboutController(){

    }

    angular.module('scanner.components')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/about', {
                templateUrl: '/components/about/about.view.html',
                controller: 'AboutCtrl'
            });
        }])
        .controller('AboutCtrl', [AboutController])
})();