(function(){
    function SourcesController($scope, $location, sourcesService){

        $scope.sources = [];
        $scope.editingSource = getEmptySource();

        $scope.addSourceQuery = function(){
            $scope.editingSource.queries.push(getEmptySourceQuery());
        };

        $scope.removeSourceQuery = function(sourceQuery){
            var index = $scope.editingSource.queries.indexOf(sourceQuery);
            $scope.editingSource.queries.splice(index, 1);
        };

        $scope.startUpdateSource = function(source){
            $scope.editingSource = source;
            $('#formModal').modal('show');
        };

        $scope.saveSource = function(){
            if($scope.editingSource._id){
                sourcesService.update($scope.editingSource)
                    .then(function(source){
                        $scope.editingSource = getEmptySource();
                        getSources();
                    })
                    .catch(function(error){
                        console.error(error);
                    })
                    .finally(function(){

                    });
            } else {
                sourcesService.create($scope.editingSource)
                    .then(function(source){
                        $scope.editingSource = getEmptySource();
                        getSources();
                    })
                    .catch(function(error){
                        console.error(error);
                    })
                    .finally(function(){

                    });
            }

        };

        // on init
        getSources();

        function getEmptySource() {
            var source = {
                id: 0,
                title: '',
                url: '',
                encoding: 'utf8',
                queries: []
            };
            return source;
        }

        function getEmptySourceQuery() {
            var sourceQuery = {
                urlQuery: '',
                textQuery: '',
                relative: false
            };
            return sourceQuery;
        }

        function getSources() {
            sourcesService.getAll()
                .then(function(sources){
                    $scope.sources = sources;
                })
                .catch(function(error){
                   console.error(error);
                });
        }
    }

    angular.module('scanner.components')
        .component('sourcesList', {
            templateUrl: '/components/sources/sources.view.html',
            controller: 'SourcesCtrl'
        })
        .controller('SourcesCtrl', ['$scope', '$location', 'sourcesService', SourcesController])
})();