'use strict';
// serve.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {

	var taskDependancies = tools.getTaskDependancies(['theme/themehtml', 'project/projecthtml']);

	// Paths + filenames
	var themePath 	= './system/themes';
	var themeFilename = 'style.scss';
	// Dependancies
	var tap 		= require('gulp-tap');
	var rename      = require('gulp-rename');
	var htmlToJs 	= require('gulp-html-to-js')
	var css2js 		= require("gulp-css2js");
	var sourcemaps  = require('gulp-sourcemaps');
	var sass        = require('gulp-sass');
	var beautify 	= require('gulp-jsbeautifier');

	var css = 'module.exports = Object.create(null)';
	var prefix = "module.exports['name'] = function() {";
	var suffix = "}";
	var modulePrefix = "";
	var themes = {};

	// Compile theme CSS
	gulp.task('theme/themecss', function(done) {
	  	gulp.src(themePath + '/**/' + themeFilename)
		    .pipe(tap(function (file) {
		    	file.path = file.path.replace('public\\css\\scss\\'+themeFilename, "")
		    	var info = tools.getFileInfo(file);
		    	var themeName = info.filename;
		    	modulePrefix = prefix.replace('name', themeName)
		    	themes[themeName] = ''+modulePrefix;
				var contents = file.contents.toString();
		    }))
			// .pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			// .pipe(sourcemaps.write())
			.pipe(css2js({
				splitOnNewline: false,
				// prefix: "var cssText = \"",
				// suffix: "\";\n"
			}))
		    .pipe(tap(function (file) {
				var info = tools.getFileInfo(file);
		    	var themeName = info.filename.replace('.js', '');
				var contents = file.contents.toString();
				themes[themeName] += contents + suffix;
		    }))
		    .pipe(tap(function (file) {
		    	var css = 'module.exports = Object.create(null);';
		    	for (var key in themes) {
		    		css += themes[key];
		    	}
		    	file.contents = Buffer.from(css);
		    }))
		    .pipe(beautify())
			.pipe(rename('themecss.js'))
		    .pipe(gulp.dest('system/themes/'))
		    .on('end', done);
	});

};