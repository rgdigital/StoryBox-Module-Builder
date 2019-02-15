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
	var projectRoot = '../../../../';
	var src = './application/src/index.html';

	var themeData = JSON.parse(fs.readFileSync('./application/database/config.json'))
	var activeTheme = themeData.theme.activeTheme;
	var themes = require(projectRoot + 'system/themes/themes.js')
	var theme = themes[activeTheme];

	var srcContent = '';

	// Compile project html
	gulp.task('projecthtml', function(done) {
	  gulp.src(src)
	  	// Switch to active theme prior to injection
	    .pipe(tap(function (file) {
			var contents = theme.toString();
			file.contents = Buffer.from(contents);
	    }))
	    // Inject
		.pipe(include({
			hardFail: true,
			includePaths: [
				"./application/src"
			]
		}))
	    .pipe(gulp.dest('application/dist/'))
	    .on('end', done);
	});

	function reload(done) {
		browserSync.reload();
		done();
	}

	gulp.watch(src, gulp.series('projecthtml', reload));

};