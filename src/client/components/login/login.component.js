(function(){
    function LoginController($scope, $http){

        $scope.loginModel = { username: 'test', password: ''};
        $scope.user = null;

        $scope.login = function(){
            $http.post('/api/auth/login', $scope.loginModel)
                .then(function(response){
                    console.log(response);
                    $scope.user = response.data.user;
                }, function(error){
                   console.error(error);
                });
        };

        $scope.safeRequest = function(){
            var headers = {
                'Authorization': 'Bearer ' + $scope.user
            };
            $http.post('/api/auth/validate', { user: $scope.user }, { headers })
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