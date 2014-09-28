'use strict';


/**
 * 
 @param {array} data - takes an array of series names and put them in the 
                       preferred orderm according to the priorities specified 
                       in constantså
                       
**/ 
econApp.factory('transformData', ['constants', 'orderNumbers', 
                function (constants, orderNumbers){

  var result = {};

  // custom comparison function used to set order
  result.transformation = function (dataObject){
    var years = Object.keys(dataObject);
    var year;
    var months;
    var month;

    for(var i = 0; i < years.length; i++){
      year = years[i];
      months = Object.keys(dataObject[year]);
      months = months.map(function (month) {return parseInt(month); });
      months.sort(orderNumbers.sortAscending);
      var monthArray = [];
      for(var j = 0; j < months.length; j++){
        month = months[j];
        monthArray.push(constants.NUMBER_TO_MONTH[month]);
      }
      dataObject[year] = monthArray;
    }
  };

  return result;

}]);