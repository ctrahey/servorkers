angular.module("main", []).config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl: 'views/main.html',
    controller: "hostController"
  }).otherwise({redirectTo:'/'});
});
angular.module("main").controller("hostController", ['$scope', 'echo', function($scope, echo){
  $scope.userinput = "Hello";
  $scope.echo = function(){
    $scope.foo = echo.callOut($scope.userinput);    
  }
}]);