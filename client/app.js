angular.module('muse', [
  'firebase',
  'ngRoute'
]);
var muse = angular.module('muse');

muse.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/stats', {
        templateUrl: 'templates/stats.html',
        controller: 'BaseStatsCtrl'
      }).
      otherwise({
        redirectTo: '/'
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
  }
]);
