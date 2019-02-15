'use strict';
// console.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {

	var taskDependancies = tools.getTaskDependancies(['theme/serve']);

	gulp.task('theme/dev', gulp.parallel(taskDependancies), function(done) {
		done();
	});
};