var mainMod = angular.module("main", []);
mainMod.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl: 'views/main.html',
    controller: "hostController"
  }).otherwise({redirectTo:'/'});
});
angular.module("main").controller("hostController", ['$scope', 'echo', function($scope, echo){
  $scope.userinput = "Hello";
  $scope.loading = false;
  $scope.echo = function(){
    $scope.loading = true;
    $scope.service_says = echo.callOut($scope.userinput);
    $scope.service_says.then(function(){
      $scope.loading = false;
    });
  }
}]);