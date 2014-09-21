'use strict';

/* Controllers */

var economicsControllers = angular.module('economicsControllers', []);

economicsControllers.controller('EconomicListCtrl', ['$scope', '$routeParams', 
                                '$http', '$anchorScroll', '$location',
  function ($scope, $routeParams, $http, $anchorScroll, $location) {
    
    $scope.seriesList = ['pce_avghr', 
    'pce_government_rate', 
    'deflated_vs_nominal_avghr',
    'federal_funds_vs_pce_deflator',
    'unemployment_vs_pce',
    'employment_vs_pce',
    'domestic_debt_vs_treasury',
    'domestic_debt_vs_prime'];

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

// economicsControllers.controller('EconomicDetailCtrl', ['$scope', '$routeParams', '$http',
//   function ($scope, $routeParams, $http) {

//     console.log('detail controller');
//     $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
//       $scope.phone = data;
//       $scope.mainImageUrl = data.images[0];
//     });

//     $scope.setImage = function (imageUrl){
//       $scope.mainImageUrl = imageUrl;
//     }
//   }]);
