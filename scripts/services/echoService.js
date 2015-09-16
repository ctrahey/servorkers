angular.module('main').service('echo', function($q, $rootScope) {
  function sleep(milliseconds) {
    var start = new Date().getTime();
    while ((new Date().getTime() - start) < milliseconds){}
  }

  
  var _echo = function() {
    this.callOut = function (words) {
      var retProm = $q.defer();
      
      // this simulates 10 "spikes" in processing, but a chance for
      // the run-loop to do it's thing in between. Your data processing
      // may have a different processing "fingerprint"
      for(var i=0; i<10; i++) {
        setTimeout(function(){
          sleep(500);          
        }, i*500);
      }
      setTimeout(function(){
        retProm.resolve(words + " " + words + "     " + words + "                  " + words);
        $rootScope.$apply();        
      }, 5000);
      return retProm.promise;
    }
  }
  return new _echo();
});