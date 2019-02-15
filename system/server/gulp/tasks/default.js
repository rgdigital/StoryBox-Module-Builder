'use strict';
// console.js
// ========
module.exports = function(gulp, config, tools) {

	var taskDependancies = tools.getTaskDependancies(['project/serve', 'project/projectcss', 'project/projectjs', 'project/projecthtml', 'project/projectassets']);
	
	gulp.task('default', gulp.parallel(taskDependancies), function(done) {
		done();
	});
	
};