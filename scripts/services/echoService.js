angular.module('main').service('echo', function($q, $rootScope) {
  function sleep(milliseconds) {
    var start = new Date().getTime();
    while ((new Date().getTime() - start) < milliseconds){}
  }

  
  var _echo = function() {
    this.callOut = function (words) {
      var retProm = $q.defer();
      
      setTimeout(function(){
        sleep(3000);
        retProm.resolve(words + " " + words + "     " + words + "                  " + words);
        $rootScope.$apply();
      }, 5);
      return retProm.promise;
    }
  }
  return new _echo();
});