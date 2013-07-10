var nop = function(){};
var _fakeDoc = {
  addEventListener:nop,
  getElementsByTagName:nop,
  createElement:function(){return {
    innerHTML: "",
    removeChild:nop,
  }},
};
var window = self;
var document = _fakeDoc;
window.document = document;
importScripts('../../components/angular/angular.js');

var workerServicesModule = angular.module("main", []);

self.addEventListener('message', function(event) {
  var message = event.data;
  var returnMessage = {
    invocationToken: message.invocationToken,
  }
  switch(message["invocationType"]) {
    case "servorkerServiceCall":
      importScripts('../../' + message.servicePath);
      break;
    case "userInvocation":
    default:
      var $injector = angular.injector(['ng', 'main']);      
      var service = $injector.get(message.serviceName);
      var method = service[message.invocationName];
      var returnVal = method.apply(service, message.invocationArgs);
      if(returnVal.then) {
        returnVal.then(function(data){
          returnMessage.invocationReturn = data;
          self.postMessage(returnMessage);
        })
      } else {
        returnMessage.invocationReturn = returnVal;
        self.postMessage(returnMessage);
      }
      break;
  }
  
}, false);

