'use strict';

/**
 * formats economic series for use with nvd3. 
 *@ param {array} format [{series0: xxx,
                           series1: xxx,
                           series2: xxx,
                           date: date},
                           ....]
    mutate to - [{name: name,
                 color: 0xxxx,
                 values: [{x: date, y: value},
                          {x: date, y: value},
                          ...]
*/

econApp.factory('nvDataBuilder', function(){
  var dataBuilder = {};

  dataBuilder.nvDataBuilder = function (data, seriesName){
    var colors = ['#1B9D77', '#2AF200','#ff7f0e'];

    var colorIndex = 0;
    var results = [];
    var seriesNames = Object.keys(data[0]);
    var dateIndex = seriesNames.indexOf('date');
    seriesNames.splice(dateIndex,1);
    seriesNames = putSeriesInDisplayOrder(seriesNames, seriesName);
   
    
    for(var i = 0; i< seriesNames.length;i++){
      var result = {};
      result.key = TITLES[seriesNames[i]];
      result.color = colors[colorIndex];
      colorIndex++;
      var values = data.map(function (record){
        var transformedRecord = {};
        transformedRecord.x = record.date;
        transformedRecord.y = record[seriesNames[i]];
        return transformedRecord;
      });
      result.values = values
      results.push(result);
    }
    return results;
  };
  
  return dataBuilder;
});