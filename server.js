var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));

app.get('/', function(request, response){
  
  // absolute path on OSx  /Users/azavadil/projects/econ/econ-client/app
  // absolute path on Docker /src/app

  var options = {
    root: __dirname + '/app',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }  
  };

  response.sendFile('index.html', options, function (error){
    if(error){
      console.log(error);
      response.status(error.status).end();
    } else {
      console.log('Sent:', 'index.html');
    }
  });
});

app.listen(9000);