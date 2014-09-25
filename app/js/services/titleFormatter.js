'use strict';

econApp.factory('titleFormatter', function (){

  var result = {};

  // custom comparison function used to set order
  result.titleFormatter = function (string){
    var transformed = [];
    var current; 
    for(var i = 0; i < string.length; i++){
      current = string.charAt(i) === ' ' ? '_' : string.charAt(i);
      transformed.push(current);
    }
    return transformed.join('');
  };

  return result;

});