'use strict';

var port = process.env.PORT || 8000; // first change

var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var swaggerize = require('swaggerize-express');
var swaggerUi = require('swaggerize-ui');
var path = require('path');

var app = express();
var server = http.createServer(app);

require('./handlers/common').initializeDB();

app.use(cors());
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use(swaggerize({
	api: path.resolve('./config/swagger.json'),
	handlers: path.resolve('./handlers'),
	docspath: '/swagger',
	security: './security'
}));

app.use('/docs', swaggerUi({
	docs: '/swagger'
}));

server.listen(port, function () { // fifth and final change
	console.info('App running on %s:%d', this.address().address, this.address().port);
});
