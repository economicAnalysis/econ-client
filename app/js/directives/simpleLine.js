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

    console.log('w', scope.width, 'h', scope.height, 'd', scope.chartData);


    
    // event listener. Wait for chartData to be set
    // and then call drawChart 
    scope.$watch('data', function (data){
      console.log('watch', data);
      if(!data){ return; }
        
      drawChart(data);
      
    });

    var drawChart = function(data){
     
      data = data.pce_avghr;

      var dates = data.map(function (element) {return element.date; });
      var series0 = data.map(function (element) {return element.pce_value; });

      console.log('drawChart', dates, d3.extent(dates));

      var xRange = d3.time.scale().range([margins.left, width-margins.right]).domain(d3.extent(dates));

      var yRange = d3.scale.linear().range([height - margins.top, margins.bottom])
                     .domain(d3.extent(series0))

      debugger;

      var xAxis = d3.svg.axis()
        .scale(xRange)
        .tickSize(5);

      var yAxis = d3.svg.axis()
        .scale(yRange)
        .tickSize(5)
        .orient('left');


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
        .call(xAxis);


      var lineFunction = d3.svg.line()
        .x(function (data){
          return xRange(data.date);
        })
        .y(function (data){
          return yRange(data.pce_value);
        })
        .interpolate('linear');

      d3.select('svg.trendline')
        .append('svg:path')
        .attr('d', lineFunction(data))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

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