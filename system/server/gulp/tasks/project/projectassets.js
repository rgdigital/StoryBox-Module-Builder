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

	var filetypes = {
		img : '.{jpeg,jpg,png,gif,svg,cur,ico}',
		font : '.{eot,ttf,otf,woff,woff2,svg}',
		video : '.{mp4,ogv,webm}',
		audio : '.{wav,mp3}'
	}

	// Compile project CSS
	gulp.task('project/projectassets', function(done) {
		gulp.src([
				'application/src/**/*' + filetypes.img,
				'application/src/**/*' + filetypes.font,
				'application/src/**/*' + filetypes.video,
				'application/src/**/*' + filetypes.audio
			])
			.pipe(gulp.dest('application/dist/'))
			.on('end', done);
			done(); // Fix
	});

	gulp.watch('application/src/public/**/*'+filetypes.img, gulp.series('project/projectassets'));

};