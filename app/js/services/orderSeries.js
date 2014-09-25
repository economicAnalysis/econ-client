'use strict';


/**
 * 
 @param {array} data - takes an array of series names and put them in the 
                       preferred orderm according to the priorities specified 
                       in constantså
                       
**/ 
econApp.factory('orderSeries', ['constants', 
                function (constants){

  var result = {};

  // custom comparison function used to set order
  var customCompare = function (x, y){
    return constants.PRIORITIES[x] - constants.PRIORITIES[y];
  };

  result.putSeriesInDisplayOrder = function (data, seriesName) {
    switch (seriesName){
      case 'deflated_vs_nominal_avghr':
        return data.sort(customCompare);
      case 'federal_funds_vs_pce_deflator':
        return data.sort(customCompare);
      case 'unemployment_vs_pce':
        return data.sort(customCompare);
      case 'employment_vs_pce':
        return data.sort(customCompare);
      case 'domestic_debt_vs_treasury':
        return data.sort(customCompare);
      case 'domestic_debt_vs_prime':
        return data.sort(customCompare);
      default:
        return data
    }
  };

  return result;

}]);