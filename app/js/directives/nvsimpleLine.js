var PRIORITIES = {
  unemployment_rate_value: 40,
  employment_rate_value: 40,
  pce_value: 30,
  govrt_rate_value: 20,
  pce_deflator_value: 10,
  treasury_10yr_value: 10,
  prime_rate_value: 10, 
  average_hour_value: 0,
  nominal_avghr_value: 0,
  deflated_avghr_value: 0,
  domestic_debt_value: 0
}

var SERIES_TITLES = {
  pce_avghr: 'Avg. Hourly Earnings lead changes in Real PCE',
  pce_government_rate: 'Changes in Government Rate leads changes in Real PCE',
  deflated_vs_nominal_avghr: 'Affect of Inflation on Hourly Earnings',
  federal_funds_vs_pce_deflator: 'Inflation leads changes in Federal Funds Rate',
  unemployment_vs_pce: 'Change in Real PCE leads Unemployment Rate',
  employment_vs_pce: 'Change in Real PCE leads Employment Rate',
  domestic_debt_vs_treasury: 'Change in Domestic Debt leads 10YR Treasury Yield',
  domestic_debt_vs_prime: 'Change in Domestic Debt lead Prime Rate'
}

var TITLES = {
  average_hour_value: 'YoY change in Average Hourly Earnings',
  pce_value: 'YoY change in Real PCE',
  govrt_rate_value: 'YoY change in Federal Funds Rate',
  nominal_avghr_value: 'YoY change in nominal Average Hourly Earnings',
  deflated_avghr_value: 'YoY change in deflated Average Hourly Earnings',
  pce_deflator_value: 'YoY change in PCE Deflator (i.e. inflation)',
  unemployment_rate_value: 'YoY change in Unemployment Rate (inverted)',
  employment_rate_value: 'YoY change in Employment Rate',
  domestic_debt_value: 'YoY change in Domestic Debt (non-financial)',
  treasury_10yr_value: '10YR Treasury Yield',
  prime_rate_value: 'Prime Rate'
};

var customCompare = function (x, y){
  return PRIORITIES[x] - PRIORITIES[y];
}

var titleFormatter = function (string){
  var results = [];
  var current; 
  for(var i = 0; i < string.length; i++){
    current = string.charAt(i) === ' ' ? '_' : string.charAt(i);
    results.push(current);
  }
  return results.join('');
};

/**
 * 
 @param {array} data - takes an array of series names and put them in the 
                       preferred order
                       Right now this is a hack to sort a single series
**/ 
 
var putSeriesInDisplayOrder = function (data, seriesName){
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


/**
 * 
 @{param} data -  format [{series0: xxx,
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

var nvDataBuilder = function (data, seriesName){
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



/**
 *  Formats data for charting
  
    Reformats the data into a scale that is appropriate for graphing

    @{array} data - series data in the format [ {date: xxx, 
                                              title0: value0, 
                                              title1: value1},
                                              ...]
*/  

var oldformatData = function (data, seriesName){
  
    // format the data depending on the series 
    // $scope.seriesList = ['pce_avghr', 'pce_government_rate'];

  switch(seriesName){
    case 'pce_avghr':
      if(!data.formatted){
        data.formatted = true;
        data.forEach( function (record) { 
          record.date = new Date(record.date);
          record.pce_value = record.pce_value / 100;
          record.average_hour_value = record.average_hour_value / 100;
        });
      }
    case 'pce_government_rate':
      if(!data.formatted){
        data.formatted = true;
        data.forEach( function (record) { 
          record.date = new Date(record.date);
          record.pce_value = record.pce_value/100;
          record.govrt_rate_value = -1*record.govrt_rate_value/100;
        });
      }
    case 'deflated_vs_nominal_avghr':
      if(!data.formatted){
        data.formatted = true;
        data.forEach( function (record) { 
          record.date = new Date(record.date);
          record.nominal_avghr_value = record.nominal_avghr_value/100;
          record.deflated_avghr_value = record.deflated_avghr_value/100;
          record.pce_deflator_value = record.pce_deflator_value/100;
        });
      }
    case 'federal_funds_vs_pce_deflator':
      if(!data.formatted){
        data.formatted = true;
        data.forEach( function (record) { 
          record.date = new Date(record.date);
          record.govrt_rate_value = record.govrt_rate_value/100;
          record.pce_deflator_value = record.pce_deflator_value/100;
        });
      }
    case 'unemployment_vs_pce':
      if(!data.formatted){
        data.formatted = true;
        data.forEach( function (record) { 
          record.date = new Date(record.date);
          record.unemployment_rate_value = -1*record.unemployment_rate_value/100;
          record.pce_value = record.pce_value/100;
        });
      }
    case 'employment_vs_pce':
      if(!data.formatted){
        data.formatted = true;
        data.forEach( function (record) { 
          record.date = new Date(record.date);
          record.employment_rate_value = record.employment_rate_value/100;
          record.pce_value = record.pce_value/100;
        });
      }
    case 'domestic_debt_vs_treasury':
      if(!data.formatted){
        data.formatted = true;
        data.forEach( function (record) { 
          record.date = new Date(record.date);
          record.domestic_debt_value = record.domestic_debt_value/100;
          record.treasury_10yr_value = record.treasury_10yr_value/100;
        });
      }
    case 'domestic_debt_vs_prime':
      if(!data.formatted){
        data.formatted = true;
        data.forEach( function (record) { 
          record.date = new Date(record.date);
          record.domestic_debt_value = record.domestic_debt_value/100;
          record.prime_rate_value = record.prime_rate_value/100;
        });
      }
    default:
      //pass
  }
}

/**
  Notice the call to directive
  @param {string} name - the name of the directive
  @param {function} factory function - should return the directive definition 
    when invoked, should return a JavaScript object
  @return {javaScript object} 

  Implementation note: a simple directive will have a restrict property and a
    template property. The template the HTML the directive will display
    Here, instead of template we have a link function which runs code that
    dynamically generates our HTML content 

*/


econApp.directive('nvsimpleLine', ['d3Service', 'nvd3Service', 'formatData', 
                  function(d3Service, nvd3Service,formatData){
    

  // directives have a link function which is essentially a "constructor"
  // Link contains everything that should happen every time the element
  // apears in the HTML
  // @param {scope} scope
  // @param {dom element} - DOM element the directive is attached
  // @param {objectHash} - all of the elements propreties  
  function link(scope, element, attr){

    d3Service.d3().then(function (d3){

      nvd3Service.nvd3().then(function (nv){
        var margins = {
          top: 20,
          right: 20,
          bottom: 20,
          left: 50
        };
        var width = scope.width - margins.right;
        var height = scope.height - margins.top;
        
        // event listener. Wait for chartData to be set
        // and then call drawChart 
        scope.$watch('data', function (data){

          if(!data){ return; }
          
          formatData.formatData(data, scope.chartTitle);
          drawChart(data);
          
        });

        /**
          @{array} data - series data in the format [ {date: xxx, 
                                                       title0: value0, 
                                                       title1: value1}]
        */

        var drawChart = function(data){

          var chartClass = titleFormatter(scope.chartTitle);


          data = nvDataBuilder(data, scope.chartTitle);

          nv.addGraph(function() {
            var chart = nv.models.lineChart()
                          .margin({left: margins.left})  //Adjust chart margins to give the x-axis some breathing room.
                          .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                          .transitionDuration(350)  //how fast do you want the lines to transition?
                          .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                          .showYAxis(true)        //Show the y-axis
                          .showXAxis(true)        //Show the x-axis
            ;

            var timeFormatter = d3.time.format('%Y');

            chart.xAxis     //Chart x-axis settings
              .axisLabel('Date')
              .tickFormat(function(d) { return d3.time.format('%Y')( new Date(d) ); });


            chart.yAxis     //Chart y-axis settings
              .axisLabel('Year over year change')
              .tickFormat(d3.format('%'));


            /* Done setting the chart up? Time to render it!*/
             // create the main svg well be drawing onto
            d3.select(element[0])
              .append("svg")  //attach an svg to the body
                .attr("width", width + margins.left + margins.right)
                .attr("height", height + margins.top + margins.bottom)
                .attr("class", chartClass)
              .append("g")
                .attr("class", "chart_" + chartClass);

            d3.select('svg.' + chartClass)    //Select the <svg> element you want to render the chart in.   
              .datum(data)         //Populate the <svg> element with chart data...
              .call(chart);          //Finally, render the chart!

            d3.select('svg.' + chartClass)
            .append("text")
            .attr("x", (margins.left))             
            .attr("y", margins.top)
            .attr("text-anchor", "left")  
            .text(SERIES_TITLES[scope.chartTitle]);
                 
            //Update the chart when window resizes.
            nv.utils.windowResize(function() { chart.update() });
            return chart;
          });

      } // end of drawChart
      }); // end of nvd3 
    });

  } //end of link function

  // note the directive returns an object
  return {
    link: link,
    restrict: 'E',
    scope: {
      data: '=',
      width: '@width',
      height: '@height',
      chartTitle: '@info'
    }
  };

}]);