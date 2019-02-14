'use strict';
// serve.js
// ========
module.exports = function(gulp, config, tools, database) {

	// Paths + filenames
	var themePath 	= './system/themes';
	var themeFilename = 'index.html';
	// Dependancies
	var tap 		= require('gulp-tap');
	var rename      = require('gulp-rename');
	var htmlToJs 	= require('gulp-html-to-js')

	// Compile theme files
	gulp.task('buildthemes', function(done) {
	  gulp.src(themePath + '/**/' + themeFilename)
	    .pipe(tap(function (file) {
			var contents = file.contents.toString();
			var info = tools.getFileInfo(file);
			file.contents = Buffer.from(contents);
			database.addTheme(info.shortname);
	    }))
	    .pipe(htmlToJs({concat: 'themes.js'}))
	    .pipe(tap(function(file) {
			var contents = file.contents.toString();
			// Remove filename
			contents = contents.replace('/index.html', '')
			file.contents = Buffer.from(contents);
	    }))
	    .pipe(gulp.dest('system/themes/'))
	    .on('end', done);
	});

};