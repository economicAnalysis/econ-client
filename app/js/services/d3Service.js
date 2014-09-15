(function(angular){
  "use strict";
    econApp.factory('d3Service', ['$document', '$q', '$rootScope',
      function($document, $q, $rootScope) {
        var d = $q.defer();
        function onScriptLoad() {
          // Load client in the browser
          $rootScope.$apply(function() { d.resolve(window.d3); });
        }
        // Create a script tag with d3 as the source
        // and call our onScriptLoad callback when it
        // has been loaded
        // $document is always an array so we use [0] to access the DOM element
        var scriptTag = $document[0].createElement('script');
        scriptTag.type = 'text/javascript'; 
        scriptTag.async = true;
        scriptTag.src = 'http://d3js.org/d3.v3.min.js';
        scriptTag.onreadystatechange = function () {
          if (this.readyState == 'complete') onScriptLoad();
        };
        scriptTag.onload = onScriptLoad;
 
        var bodyScript = $document[0].getElementsByTagName('body')[0];
        bodyScript.appendChild(scriptTag);
 
        return {
          d3: function() { return d.promise; }
        };
  }]);
}(angular));