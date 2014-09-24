'use strict';

econApp.factory('formatData', function(){
  var formatter = {};

  formatter.formatData = function (data, seriesName){
  
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
  }; // end of formatData function
 
  return formatter;

});