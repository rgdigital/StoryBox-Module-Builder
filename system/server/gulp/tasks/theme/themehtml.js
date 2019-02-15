'use strict';
// serve.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {
	
	// Paths + filenames
	var themePath 	= './system/themes';
	var themeFilename = 'index.html';
	// Dependancies
	var tap 		= require('gulp-tap');
	var rename      = require('gulp-rename');
	var htmlToJs 	= require('gulp-html-to-js')

	// Compile theme HTML
	gulp.task('theme/themehtml', function(done) {
	  gulp.src(themePath + '/**/' + themeFilename)
	    .pipe(tap(function (file) {
			var info = tools.getFileInfo(file);
			database.addTheme(info.shortname);
	    }))
	    .pipe(htmlToJs({concat: 'themehtml.js'}))
	    .pipe(tap(function(file) {
			var contents = file.contents.toString();
			// Remove filename
			contents = contents.replace(/\b\/index.html/g, '');
			file.contents = Buffer.from(contents);
	    }))
	    .pipe(gulp.dest('system/themes/'))
	    .on('end', done);
	});

};