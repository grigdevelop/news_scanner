(function(){
    function HomeController(){

    }

    angular.module('scanner.components')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/', {
                templateUrl: '/components/home/home.view.html',
                controller: 'HomeCtrl'
            });
        }])
        .controller('HomeCtrl', [HomeController])
})();