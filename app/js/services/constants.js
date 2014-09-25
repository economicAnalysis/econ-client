'use strict';

econApp.factory('constants', function (){

  var constants = {};

  constants.SERIES_LIST = ['pce_avghr', 
    'pce_government_rate', 
    'deflated_vs_nominal_avghr',
    'federal_funds_vs_pce_deflator',
    'unemployment_vs_pce',
    'employment_vs_pce',
    'domestic_debt_vs_treasury',
    'domestic_debt_vs_prime'];

  constants.SERIES_TITLES = {
    pce_avghr: 'Avg. Hourly Earnings lead changes in Real PCE',
    pce_government_rate: 'Changes in Government Rate leads changes in Real PCE',
    deflated_vs_nominal_avghr: 'Affect of Inflation on Hourly Earnings',
    federal_funds_vs_pce_deflator: 'Inflation leads changes in Federal Funds Rate',
    unemployment_vs_pce: 'Change in Real PCE leads Unemployment Rate',
    employment_vs_pce: 'Change in Real PCE leads Employment Rate',
    domestic_debt_vs_treasury: 'Change in Domestic Debt leads 10YR Treasury Yield',
    domestic_debt_vs_prime: 'Change in Domestic Debt lead Prime Rate'
  }
  
  constants.ASIDE_TITLES = {
    pce_avghr: 'Avg. Hour vs. Real PCE',
    pce_government_rate: 'Fed. Funds vs Real PCE',
    deflated_vs_nominal_avghr: 'Avg. Hourly Earnings',
    federal_funds_vs_pce_deflator: 'Fed. Funds vs. Inflation',
    unemployment_vs_pce: 'Real PCE vs. Unemployment',
    employment_vs_pce: 'Real PCE vs. Employment',
    domestic_debt_vs_treasury: 'Domestic Debt vs 10YR Treasury',
    domestic_debt_vs_prime: 'Domestic Debt vs. Prime Rate'
  };

  constants.TITLES = {
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

  constants.PRIORITIES = {
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
  };

  return constants;
});