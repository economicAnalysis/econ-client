
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
                  'nvDataBuilder', 'orderSeries','constants','titleFormatter',
                  function(d3Service, nvd3Service,formatData, nvDataBuilder,
                           orderSeries, constants, titleFormatter){
    

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

          var chartClass = titleFormatter.titleFormatter(scope.chartTitle);


          data = nvDataBuilder.nvDataBuilder(data, scope.chartTitle);

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
            .text(constants.SERIES_TITLES[scope.chartTitle]);
                 
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