'use strict';
// console.js
// ========
module.exports = function(gulp, config, tools) {
	var gutil = require('gulp-util');
	var tasks = ['serve', 'projectcss'];

	var taskDependancies = tools.getTaskDependancies(['serve', 'projectcss']);
	
	gulp.task('default', gulp.parallel(taskDependancies), function(done) {
		done();
	});

	// gulp.task('default', gulp.series(
	//   // 'serve',
	//   gulp.parallel(taskDependancies)
	// ));
};