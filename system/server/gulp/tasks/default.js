'use strict';
// console.js
// ========
module.exports = function(gulp, config, tools) {

	var taskDependancies = tools.getTaskDependancies(['serve', 'project/projectcss', 'project/projectjs', 'project/projecthtml']);
	
	gulp.task('default', gulp.parallel(taskDependancies), function(done) {
		done();
	});

	// gulp.task('default', gulp.series(
	//   // 'serve',
	//   gulp.parallel(taskDependancies)
	// ));
};