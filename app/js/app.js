'use strict';

/* App Module */

var econApp = angular.module('econApp', [
  'ngRoute',
  'economicsControllers'
]);

econApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/economic-front.html',
        controller: 'EconomicFrontCtrl'
      }).
      when('/:year/:month', {
        templateUrl: 'partials/economic-list.html',
        controller: 'EconomicListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
