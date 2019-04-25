(function(){
    function ProfileController($scope, $location, sourcesService){

        onLoad();

        function onLoad() {
            sourcesService.getAll()
                .then(function(sources){
                    console.log(sources);
                });
        }

    }

    angular.module('scanner.components')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/profile', {
                templateUrl: '/components/profile/profile.view.html',
                controller: 'ProfileCtrl',
                auth: true
            });
        }])
        .controller('ProfileCtrl', ['$scope', '$location', 'sourcesService', ProfileController])
})();