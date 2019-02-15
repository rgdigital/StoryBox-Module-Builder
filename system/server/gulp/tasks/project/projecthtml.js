'use strict';
// serve.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {

	// Dependancies
	var fs = require("fs");
	var tap 		= require('gulp-tap');
	var rename      = require('gulp-rename');
	var include     = require("gulp-include");

	// Paths + filenames
	var projectRoot = '../../../../../';
	var src = './application/src/index.html';

	var themeData = JSON.parse(fs.readFileSync('./application/database/config.json'))
	var activeTheme = themeData.theme.activeTheme;
	var themehtml = require(projectRoot + 'system/themes/themehtml.js');
	var theme = themehtml[activeTheme];

	var themesCSS = require(projectRoot + 'system/themes/themecss.js')
	var themeCSS = themesCSS[activeTheme];

	var srcContent = '';

	// Compile project html
	gulp.task('project/projecthtml', function(done) {
	  gulp.src(src)
	  	// Switch to active theme prior to injection
	    .pipe(tap(function (file) {
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
		// Inject theme CSS
	    .pipe(tap(function (file) {
			var contents = file.contents.toString();
			contents = contents.replace('<!-- THEMECSS -->', '<script>('+themeCSS.toString()+')()</script>')
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