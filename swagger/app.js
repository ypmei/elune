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

module.exports = app; // for testing
module.exports = appSetup
