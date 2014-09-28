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
          '': {templateUrl: 'partials/main-panel.html'
          },
          'columnOne@detail': { 
            templateUrl:'partials/detail-aside.html',
            controller: 'DetailAsideCtrl'
          },
          'columnTwo@detail': { 
            templateUrl:'partials/economic-front.html',
            controller: 'EconomicListCtrl'
          }
        }
      });
     
  } // end of function

]);
