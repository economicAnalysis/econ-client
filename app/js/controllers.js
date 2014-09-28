'use strict';

/* Controllers */

var economicsControllers = angular.module('economicsControllers', []);

economicsControllers.controller('EconomicListCtrl', ['$scope', '$stateParams', 
                                '$http', '$anchorScroll', '$location','constants',
  function ($scope, $stateParams, $http, $anchorScroll, $location, constants) {
    
    $scope.seriesList = constants.SERIES_LIST;
    $scope.asideTitles = constants.ASIDE_TITLES;

    var path = $stateParams.year + '/' + $stateParams.month;
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
      locationId = '' + locationId; // cast to string
      $location.hash(locationId);

        // call $anchorScroll()
      $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old);
    }

  }]);

economicsControllers.controller('FrontAsideCtrl', ['$scope', '$http', 
                                '$location','constants','orderNumbers',
                                'transformData','$sce',
  function ($scope,  $http, $location, constants, orderNumbers, transformData, $sce) {
    
    var baseUrl = constants.BASE_URL; 
    var endpoint = baseUrl + '/dates'
    $scope.MONTH_TO_NUMBER = constants.MONTH_TO_NUMBER;
    

    $http.get(endpoint).success(function(data) {

      var years = Object.keys(data);
      var _idIndex = years.indexOf('_id');
      years.splice(_idIndex,1);
      years.sort(orderNumbers.sortDescending)
      $scope.years = years; //years;
      
      // transform the data
      delete data._id;
      transformData.transformation(data);
      $scope.data = data;

      // create state to track which years are expanded
      var expandedYears = {};
      for(var i = 0; i < years.length; i++){
        expandedYears[years[i]] = false;
      }
      $scope.expandedYears = expandedYears;
   
    })
    .error(function (error){
      throw error;
    });

    $scope.expandList = function ($event){
      // code here
      // if($scope.expandedYears[this.year]){
      //   event.toElement.innerHTML("&#9660;&#160;");
      // } else {
      //   event.toElement.innerHTML("&#9658;&#160;")
      // }
      $scope.expandedYears[this.year] = !$scope.expandedYears[this.year];
      
    };

  }]);


economicsControllers.controller('DetailAsideCtrl', ['$scope','constants',
  function ($scope, constants) {
    
    $scope.seriesList = constants.SERIES_LIST;
    $scope.asideTitles = constants.ASIDE_TITLES;


  }]);