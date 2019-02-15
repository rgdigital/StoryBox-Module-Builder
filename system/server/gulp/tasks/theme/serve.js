'use strict';
// serve.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {

	var taskDependancies = tools.getTaskDependancies(['theme/themecss', 'theme/themehtml']);

	var nodemon     = require('gulp-nodemon');
	
	gulp.task('theme/serve', function(done) {
		
		tools.log('Developing themes');
		// Browsersync server
		browserSync.init({
			server: {
				baseDir: [
					// path.cache,
					'application/dist/'
				],
				index: "index.html",
				files: [
					// 'application/config/config.json',
					// 'build/dist/**',
				]
			}
		});

		done();
	});

	function reload(done) {
		browserSync.reload();
		done();
	}

	// CSS
	gulp.watch('./system/themes' + '/**/' + 'style.scss', gulp.series('theme/themecss', 'theme/themehtml', 'project/projecthtml', reload));

	// HTML
	gulp.watch('./system/themes' + '/**/' + 'index.html', gulp.series('theme/themecss', 'theme/themehtml', 'project/projecthtml', reload));
};