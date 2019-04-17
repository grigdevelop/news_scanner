(function(){
    function ProfileController(){

    }

    angular.module('scanner.components')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/profile', {
                templateUrl: '/components/profile/profile.view.html',
                controller: 'ProfileCtrl'
            });
        }])
        .controller('ProfileCtrl', [ProfileController])
})();