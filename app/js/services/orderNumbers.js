'use strict';


/**
 * 
 @param {array} data - takes an array of series names and put them in the 
                       preferred orderm according to the priorities specified 
                       in constantså
                       
**/ 
econApp.factory('orderNumbers', function (){

  var result = {};

  // custom comparison function used to set order
  result.sortDescending = function (x, y){
    if( x < y ) return 1;
    if( x > y ) return -1;
    return 0;
  };

  result.sortAscending = function (x, y){
    if( x < y ) return -1;
    if( x > y ) return 1;
    return 0;
  };

  return result;

});