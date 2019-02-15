'use strict';
// console.js
// ========
module.exports = function(gulp, config, tools) {

	var taskDependancies = tools.getTaskDependancies(['serve', 'projectcss', 'projectjs', 'projecthtml']);
	
	gulp.task('default', gulp.parallel(taskDependancies), function(done) {
		done();
	});

	// gulp.task('default', gulp.series(
	//   // 'serve',
	//   gulp.parallel(taskDependancies)
	// ));
};