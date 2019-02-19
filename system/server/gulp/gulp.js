'use strict';

/*
 * Read package.json contents
 */
var fs      = require("fs");
var config  = JSON.parse(fs.readFileSync('./package.json')).config;
var argv    = require('yargs').argv;
var browserSync = require('browser-sync').create()

/*
 * Config + tools
 */
var filetype = require('./tools/filetypes');
var tools = require('./tools/tools');
var database = require('./tools/database');

/*
 * Task modules
 */
var gulp = require('gulp');
var fs = require('fs');
var path = __filename + 'tasks';

/*
 * Get specified task name
 */
var taskName = argv._[0]!==undefined ? argv._[0] : 'default';

/*
 * Fire task
 */
if (taskName) {
  tools.log('Running task from tasks/'+taskName);
  require('./tasks/' + taskName)(gulp, config, tools, database, browserSync);
}