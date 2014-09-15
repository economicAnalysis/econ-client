econApp.directive('simpleLine', function(){
    

  // directives have a link function which is essentially a "constructor"
  // Link contains everything that should happen every time the element
  // apears in the HTML
  // @param {scope} scope
  // @param {dom element} - DOM element the directive is attached
  // @param {objectHash} - all of the elements propreties  
  function link(scope, element, attr){


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
      console.log('watch', data);
      if(!data){ return; }
        
      drawChart(data);
      
    });

    var drawChart = function(data){
     
      data = data.pce_avghr;
      data.forEach( function (record) { 
        record.date = new Date(record.date);
        record.pce_value = record.pce_value/100;
        record.average_hour_value = record.average_hour_value / 100;
      });
      dates = data.map(function (record){ return record.date });
      var pceSeries = data.map(function (element) { return element.pce_value; });
      var avghrSeries = data.map(function (element) { return element.average_hour_value; })

      console.log('drawChart', dates, d3.extent(dates));

      var xRange = d3.time.scale().range([margins.left, width-margins.right]).domain(d3.extent(dates));

      var yRangeLeft = d3.scale.linear().range([height - margins.top, margins.bottom])
                     .domain(d3.extent(pceSeries));

      var yRangeRight = d3.scale.linear().range([height - margins.top, margins.bottom])
                     .domain(d3.extent(avghrSeries));

      var xAxis = d3.svg.axis()
        .scale(xRange)
        .tickSize(5);

      var yAxisLeft = d3.svg.axis()
        .scale(yRangeLeft)
        .tickSize(5)
        .tickFormat(d3.format("%"))
        .orient('left');

      var yAxisRight = d3.svg.axis()
        .scale(yRangeRight)
        .tickSize(5)
        .tickFormat(d3.format("%"))
        .orient('right');


      // create the main svg well be drawing onto
      d3.select(element[0])
        .append("svg")  //attach an svg to the body
          .attr("width", width + margins.left + margins.right)
          .attr("height", height + margins.top + margins.bottom)
          .attr("class", "trendline")
        .append("g")
          .attr("class", "chart");

      d3.select('svg.trendline')
        .append('svg:g') 
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
        .call(xAxis);

      d3.select('svg.trendline')
        .append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (margins.left) + ',0)')
        .call(yAxisLeft);

      d3.select('svg.trendline')
        .append('svg:g')
        .attr('class', 'y axis right')
        .attr('transform', 'translate(' + (width - margins.right) + ',0)')
        .call(yAxisRight);


      var pceLineFunction = d3.svg.line()
        .x(function (data){
          return xRange(data.date);
        })
        .y(function (data){
          return yRangeLeft(data.pce_value);
        })
        .interpolate('linear');

      var avghrLineFunction = d3.svg.line()
        .x(function (data){
          return xRange(data.date);
        })
        .y(function (data){
          return yRangeRight(data.average_hour_value);
        })
        .interpolate('linear');

      d3.select('svg.trendline')
        .append('svg:path')
        .attr('d', pceLineFunction(data))
        .attr('stroke', '#1B9D77')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

      d3.select('svg.trendline')
        .append('svg:path')
        .attr('d',avghrLineFunction(data))
        .attr('stroke', '#2AF200')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

      d3.select('svg.trendline')
        .append('svg:path')

    } // end of drawChart


  } //end of link function

  return {
    link: link,
    restrict: 'E',
    scope: {
      data: '=',
      width: '@width',
      height: '@height'
    }
  };

});