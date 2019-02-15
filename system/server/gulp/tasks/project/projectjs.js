'use strict';
// serve.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {

	// Dependancies
	var fs 			= require("fs");
	var concat      = require('gulp-concat');
	var rename      = require('gulp-rename');
	var uglify      = require('gulp-uglify');
	var sourcemaps  = require('gulp-sourcemaps');
	var prettyError = require('gulp-prettyerror');

	// Paths + filenames
	var projectRoot = '../../../../../';
	var src = './application/src/public/js/*.js';

	var themeData = JSON.parse(fs.readFileSync('./application/database/config.json'))

	// Compile project JS
	gulp.task('project/projectjs', function(done) {
		gulp.src(src)
			.pipe(prettyError())
			.pipe(sourcemaps.init())
			.pipe(concat('app.min.js'))
			.pipe(uglify())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./application/dist'))
			.on('end', done);
	});

	function reload(done) {
		browserSync.reload();
		done();
	}

	gulp.watch('application/src/public/js/*.js', gulp.series('project/projectjs', reload));

};