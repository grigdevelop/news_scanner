(function(){
    function ProfileController($scope, $location, authService){
        console.log('loading profile view');

        $scope.logout = function(){
            authService.logout();
            $location.path('/login');
        };

    }

    angular.module('scanner.components')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/profile', {
                templateUrl: '/components/profile/profile.view.html',
                controller: 'ProfileCtrl',
                auth: true
            });
        }])
        .controller('ProfileCtrl', ['$scope', '$location', 'authService', ProfileController])
})();