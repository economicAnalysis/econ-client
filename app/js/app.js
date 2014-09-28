'use strict';

/* App Module */

var econApp = angular.module('econApp', [
  'ui.router',
  'ngRoute',
  'economicsControllers'
]);

econApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home')

    $stateProvider
      .state('home',{
        url: '/home',
        views: {
          '': {templateUrl: 
            'partials/main-panel.html'
          },
          'columnOne@home': { 
            templateUrl:'partials/front-aside.html',
            controller: 'FrontAsideCtrl'
          },
          'columnTwo@home': { 
            templateUrl:'partials/economic-front.html',
            controller: 'EconomicFrontCtrl'
          }
        }
      })
      .state('detail', {
        url: '/:year/:month',
        views: {
          '': {templateUrl: 
            'main-panel.html'
          },
          'columnOne@home': { 
            template:'partials/economic-front.html',
            controller: 'EconomicFrontCtrl'
          },
          'columnTwo@home': { 
            template:'partials/economic-front.html',
            controller: 'EconomicFrontCtrl'
          }
        }
      });
     
  } // end of function

]);
