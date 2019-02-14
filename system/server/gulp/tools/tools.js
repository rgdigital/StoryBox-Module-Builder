module.exports = {

	/*
	 * Log messages
	 */
	log : function(message) {
		var clc = require('cli-color');
		// https://www.npmjs.com/package/cli-color
		// console.log(clc.blue('---------------------------------------'))
		var str = '[';
			str += clc.blue('Storybox');
			str += '] ';
			str += clc.magenta(message);
		console.log(str);
	},

	/*
	 * Log all file props
	 */
	logAllFileProps : function(file) {
		var propValue;
		for(var propName in file) {
		    propValue = file[propName];
		    console.log('name:' + propName, ', value:<<<',propValue,'>>>');
		}
	},

	/*
	 * Grab the dependancy tasks needed for a module
	 */
	getTaskDependancies : function(dependancyTaskNames) {
		var fs = module.parent.require('fs');
		var gulp = module.parent.require('gulp');
		var config = JSON.parse(fs.readFileSync('./package.json')).config;
		var browserSync = require('browser-sync').create()
		var tools = require('./tools');
		var database = require('./database');

		if (!(dependancyTaskNames instanceof Array)) {
			// Convert to array
			var arr = [];
			arr.push(dependancyTaskNames);
			dependancyTaskNames = arr;
		}
		// Instantiate modules
		for (var i = 0; i < dependancyTaskNames.length; i++) {
			console.log(dependancyTaskNames[i]);
			module.require('../tasks/'+dependancyTaskNames[i])(gulp, config, tools, database, browserSync);
		}
		return dependancyTaskNames;
	},

	/*
	 * Get file info from buffer stream
	 */
	getFileInfo : function(file) {
		var path 		= require("path");
		var filename = path.basename(file.path);
		var filepath = file.path.replace(filename, '');
		var parts = filepath.split('\\').filter(function (el) {
			return el != '';
		});
		var templateName = parts[parts.length-1];
		return {
			filename : filename,
			path : filepath,
			parts : parts,
			shortname : templateName
		}
	}
	
};