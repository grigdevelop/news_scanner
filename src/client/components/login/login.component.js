(function(){
    function LoginController($scope, $location, authService){

        $scope.loginModel = { username: 'test', password: ''};

        $scope.login = function(){

            authService.login($scope.loginModel)
                .then(function(response){
                    $location.path('/profile');
                })
                .catch(function(error){
                   console.error(error);
                });
        };

    }

    angular.module('scanner.components')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/login', {
                templateUrl: '/components/login/login.view.html',
                controller: 'LoginCtrl',
                auth: false
            });
        }])
        .controller('LoginCtrl', ['$scope', '$location','authService', LoginController])
})();