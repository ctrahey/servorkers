var remoteWorker = new Worker('scripts/services/servorker.js');


var srvkr = angular.module('main');


srvkr.service('ServorkerManager', function($q){
  var _srvMan = function() {
    console.log("getting created");
    var self = this;
    this._promiseHeap = [];
    this.dequeuePromise = function(id) {
      var prom = self._promiseHeap.splice(id, 1)[0];
      return prom;
    };
    this.newPromise = function() {
      var index = self._promiseHeap.length;
      var newProm = $q.defer();
      newProm._srvrkrID = index;
      self._promiseHeap[index] = newProm;
      return newProm;
    };
  }
  return new _srvMan();
});

var injector = angular.injector(['ng', 'main']);
var ServorkerManager = injector.get('ServorkerManager');
var $rootScope = injector.get('$rootScope');

remoteWorker.addEventListener('message', function(e) {
  var prom = ServorkerManager.dequeuePromise(e.data.invocationToken);
  $rootScope.$apply(function(){
    prom.resolve(e.data.invocationReturn);    
  });
}, false);


function registerServorker(serviceName, path) {
  remoteWorker.postMessage({
    invocationType:"servorkerServiceCall",
    invocationName:"registerService",
    serviceName: serviceName,
    servicePath: path
  });
  
  
  
  
  angular.module('main').service(serviceName, function($q, $rootScope){
    var _servorkerManager = function() {
    }
    var _servorker = new _servorkerManager();

    // var _serviceProxy = {
    //       get:function(proxied, name) {
    //         return _servorker[name] || function(){
    //           var prom = ServorkerManager.newPromise();
    //           var invocationMessage = {
    //             invocationType:"userInvocation",
    //             invocationName:name,
    //             invocationArgs: Array.prototype.slice.call(arguments),
    //             serviceName: serviceName,
    //             invocationToken: prom._srvrkrID,
    //           };
    //           remoteWorker.postMessage(invocationMessage, []);
    //           var retpromise = prom.promise;
    //           retpromise.then(function(data){
    //             setTimeout(function(){$rootScope.$apply();},1);
    //             return data;
    //           })
    //           return retpromise;
    //         }
    //       }
    //     }
    
    var servicePromise = $q.defer();
    setTimeout(function(){
      // var _prox = Proxy.create(_serviceProxy, Object.getPrototypeOf(_servorker));
      $rootScope.$apply(function(){
        var fakeObj = {
          callOut:function() {
            var prom = ServorkerManager.newPromise();
            var invocationMessage = {
              invocationType:"userInvocation",
              invocationName:'callOut',
              invocationArgs: Array.prototype.slice.call(arguments),
              serviceName: serviceName,
              invocationToken: prom._srvrkrID,
            };
            remoteWorker.postMessage(invocationMessage, []);
            var retpromise = prom.promise;
            retpromise.then(function(data){
              setTimeout(function(){$rootScope.$apply();},1);
              return data;
            })
            return retpromise;
            
          }
        }
        console.log("resolving service, yo!");
        servicePromise.resolve(fakeObj);        
      });
      // return _prox;      
    }, 200);
    return servicePromise.promise;
    
  });
}
