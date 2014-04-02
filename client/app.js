angular.module('muse', [
  'firebase',
  'ngRoute'
]);
var muse = angular.module('muse');
angular.module('muse').constant('loginRedirectPath', '/login');

muse.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }).
      when('/stats', {
        templateUrl: 'templates/stats.html',
        controller: 'BaseStatsCtrl'
      }).
      when('/gm', {
        templateUrl: 'templates/gm.html'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }
]);

muse.factory('fbService', ['$firebase', function($firebase) {
  var ref = new Firebase('https://sweltering-fire-1770.firebaseio.com/character/baseStats');
  return $firebase(ref);
}]);

muse.controller('BaseStatsCtrl', ['$scope', 'fbService',
  function($scope, service) {
    service.$bind($scope, 'baseStats');
    console.log($scope);
    // $scope.$on('change', function() {
    //   console.log('change');
    // });
  }
]);

muse.controller('LoginCtrl', ['$scope', '$firebaseSimpleLogin',
  function($scope, $firebaseSimpleLogin) {
    var dataRef = new Firebase('https://sweltering-fire-1770.firebaseio.com');
    $scope.loginObj = $firebaseSimpleLogin(dataRef);

  }
]);

muse.controller('LogCtrl', ['$scope', 'fbService', '$firebase',
  function($scope, service, $firebase) {
    var ref = new Firebase('https://sweltering-fire-1770.firebaseio.com/log');
    $scope.messages = $firebase(ref);
    service.$on('change', function(e) {
      $scope.messages.$add(e + ' was changed');
      console.log('change', e);
    });
  }
]);



