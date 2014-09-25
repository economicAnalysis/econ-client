'use strict';

/* Controllers */

var economicsControllers = angular.module('economicsControllers', []);

economicsControllers.controller('EconomicListCtrl', ['$scope', '$routeParams', 
                                '$http', '$anchorScroll', '$location','constants',
  function ($scope, $routeParams, $http, $anchorScroll, $location, constants) {
    
    $scope.seriesList = constants.SERIES_LIST;
    $scope.asideTitles = constants.ASIDE_TITLES;

    var path = $routeParams.year + '/' + $routeParams.month;
    var endpoint = 'http://localhost:5000/' + path;  

    $scope.path = path;

    $http.get(endpoint).success(function(data) {
      $scope.economicSeries = data;
    })
    .error(function (error){
      throw error;
    });

    $scope.scrollTo = function (locationId){
      var old = $location.hash();
      console.log('scrollTo triggered', locationId);  
      locationId = '' + locationId; // cast to string
      $location.hash(locationId);

        // call $anchorScroll()
      $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old);
    }

  }]);

economicsControllers.controller('EconomicFrontCtrl', ['$scope', '$routeParams', 
                                '$http', '$anchorScroll', '$location','constants',
  function ($scope, $routeParams, $http, $anchorScroll, $location, constants) {
    
    $scope.seriesList = constants.SERIES_LIST;
    $scope.asideTitles = constants.ASIDE_TITLES;

    var endpoint = 'http://localhost:5000/';  

   
    $http.get(endpoint).success(function(data) {
      $scope.economicSeries = data;
    })
    .error(function (error){
      throw error;
    });

    $scope.scrollTo = function (locationId){
      var old = $location.hash();
      console.log('scrollTo triggered', locationId);  
      locationId = '' + locationId; // cast to string
      $location.hash(locationId);

        // call $anchorScroll()
      $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old);
    }

  }]);
