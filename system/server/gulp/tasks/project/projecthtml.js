'use strict';
// serve.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {

	// Dependancies
	var fs = require("fs");
	var tap 		= require('gulp-tap');
	var rename      = require('gulp-rename');
	var include     = require("gulp-include");
	var decache 	= require('decache');

	// Paths + filenames
	var projectRoot = '../../../../../';
	var src = './application/src/index.html';

	var projectData = JSON.parse(fs.readFileSync('./application/database/config.json'))
	var activeTheme = projectData.theme.activeTheme;

	var srcContent = '';

	// Compile project html
	gulp.task('project/projecthtml', function(done) {
	  gulp.src(src)
	  	// Switch to active theme prior to injection
	    .pipe(tap(function (file) {
			var themehtml = require(projectRoot + 'system/themes/themehtml.js');
			var theme = themehtml[activeTheme];
			var contents = theme.toString();
			file.contents = Buffer.from(contents);
	    }))
	    // Inject HTML
		.pipe(include({
			hardFail: true,
			includePaths: [
				"./application/src"
			]
		}))
	    .pipe(tap(function (file) {
	    	var contents = file.contents.toString();
			// String replacement names
			var template_name = projectData.project.template_name;
			var template_shortname = projectData.project.template_shortname;
			var template_description = projectData.project.template_description;
			var base_url = projectData.project.base_url;
			// Replace
			contents = contents.replace(/<!--##TEMPLATESHORTNAME##-->/g, template_shortname)
			contents = contents.replace(/<!--##TEMPLATENAME##-->/g, template_name)
			contents = contents.replace(/<!--##TEMPLATEDESC##-->/g, template_description)
			contents = contents.replace(/<!--##BASEURL##-->/g, base_url)
			// Buffer back to the stream
			file.contents = Buffer.from(contents);
	    }))
		// Inject theme CSS
	    .pipe(tap(function (file) {
	    	// Clear require cache per module
			decache(projectRoot + 'system/themes/themecss.js');
			// Get a fresh one
			var themesCSS = require(projectRoot + 'system/themes/themecss.js')
			var themeCSS = themesCSS[activeTheme].toString();
			var contents = file.contents.toString();
			contents = contents.replace('<!-- THEMECSS -->', '<script>('+themeCSS+')()</script>')
			// themeCSS.toString()
			// console.log(themeCSS)
			file.contents = Buffer.from(contents);
	    }))
	    .pipe(gulp.dest('application/dist/'))
	    .on('end', done);
	});

	function reload(done) {
		browserSync.reload();
		done();
	}

	gulp.watch(src, gulp.series('project/projecthtml', reload));

};