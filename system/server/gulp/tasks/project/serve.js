'use strict';
// serve.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {

	var nodemon     = require('gulp-nodemon');
	
	gulp.task('project/serve', function(done) {
		// Express server
		nodemon({
			script: 'system/server/express/server.js',
			watch : 'system/server/express/server.js',
			ext : 'json'
		}).on('start', function () {
			// Browsersync server
			browserSync.init({
				server: {
					baseDir: [
						// path.cache,
						'application/dist/'
					],
					index: "index.html",
					files: [
						// 'application/dist/',
						// 'application/config/config.json',
						// 'build/dist/**',
					]
				}
			});
		});

		done();
	});
};