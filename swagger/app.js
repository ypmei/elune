'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

var config = {
  appRoot: __dirname // required config
}

var appSetup = function(app){
  SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }
    // install middleware
    swaggerExpress.register(app);
  })
}

if(process.env.NODE_ENV === 'development'){
  appSetup(app);
  app.listen(3000);
  console.log('http://127.0.0.1:3000');
}

module.exports = app; // for testing
module.exports = appSetup
