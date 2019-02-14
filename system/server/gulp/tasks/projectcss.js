'use strict';
// serve.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {

	var sass        = require('gulp-sass');
	var sourcemaps  = require('gulp-sourcemaps');
	var rename      = require('gulp-rename');
	var gulpif 		= require('gulp-if');

	// var taskDependancies = tools.getTaskDependancies('serve');
	// gulp.task('default', gulp.parallel(taskDependancies), function(done) {

	// Compile project CSS
	gulp.task('projectcss', function(done) {
		gulp.src('application/src/public/css/scss/style.scss')
			.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(sourcemaps.write())
			.pipe(rename('style.min.css'))
			.pipe(gulp.dest('application/dist/'))
			.pipe(gulpif(!!browserSync.active, browserSync.stream()))
			.on('end', done);
			done(); // Fix

		gulp.watch('application/src/public/css/scss/style.scss', gulp.series('projectcss'));
	});

};