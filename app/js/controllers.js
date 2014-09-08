'use strict';

/* Controllers */

var economicsControllers = angular.module('economicsControllers', []);

economicsControllers.controller('EconomicListCtrl', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {
    
    var path = $routeParams.year + '/' + $routeParams.month;
    var endpoint = 'http://localhost:5000/' + path;  
    $http.get(endpoint).success(function(data) {
      $scope.economicSeries = data;
    })
    .error(function (error){
      throw error;
    });

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
