/*
 * Setup static file dirs
 */
var rootDir = __dirname + "/../../../";

/*
 * Dependancies
 */
var fs      	= require("fs");
var config  	= JSON.parse(fs.readFileSync('./package.json')).config;
var sys 		= require('util');
var express 	= require('express');
var path    	= require("path");
var app			= express();
var cors 		= require('cors')
// var formidable	= require('formidable');
var exec 		= require('child_process').exec;
var clc 		= require('cli-color');
// var bodyParser 	= require("body-parser");
// var cloudinary 	= require('cloudinary');
var url 		= require('url');
var exec        = require('child_process').exec;
// Store all HTML files in view folder.
app.use(express.static(rootDir + "application/preview/"));
// Store all JS and CSS in Scripts folder.
app.use(express.static(rootDir + "application/preview/public/"));

/*
 * Setup middleware
 * Here we are configuring express to use body-parser as middle-ware.
 */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 * Enable CORS
 */
app.use(cors())

/*
 * Log messages
 */
function log(message) {
	// https://www.npmjs.com/package/cli-color
	console.log('---------------------------------------')
	var str = '[';
		str += clc.blue('Storybox');
		str += '] ';
		str += clc.magenta(message);
	console.log(str);
}

/*
 * Routes
 */

// Preview
app.get('/', function(req, res) {
	res.send('Storybox task runner server.');
});

/*
 * Start server
 */
var server = app.listen(config.server.expressPort, function() {
	log('Express server started at http://localhost:'+config.server.expressPort);
});

/*
 * Terminate on shutdown
 */
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

let connections = [];
server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
    log('Received kill signal, shutting down gracefully');
    server.close(() => {
        log('Closed out remaining connections');
        process.exit(0);
    });
    setTimeout(() => {
        log('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}