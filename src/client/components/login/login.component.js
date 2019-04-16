(function(){
    function LoginController($scope, $http){

        $scope.loginModel = { username: 'test', password: ''};

        $scope.login = function(){
            $http.post('/api/auth/login', $scope.loginModel)
                .then(function(response){
                    console.log(response);
                }, function(error){
                   console.error(error);
                });
        };

    }

    angular.module('scanner.components')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/login', {
                templateUrl: '/components/login/login.view.html',
                controller: 'LoginCtrl'
            });
        }])
        .controller('LoginCtrl', ['$scope', '$http', LoginController])
})();