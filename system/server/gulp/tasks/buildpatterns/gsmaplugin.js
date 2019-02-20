'use strict';
// console.js
// ========
module.exports = function(gulp, config, tools, database, browserSync) {

	var deploymentName = 'GSMA';

	// Dependancies
	var fs 			= require("fs");
	var download    = require('download-file')
	var concat      = require('gulp-concat');
	var rename      = require('gulp-rename');
	var uglify      = require('gulp-uglify');
	var cleanCSS    = require('gulp-clean-css');
	var sourcemaps  = require('gulp-sourcemaps');
	var prettyError = require('gulp-prettyerror');
	var tap 		= require('gulp-tap');
	var include     = require("gulp-include");
	var decache 	= require('decache');

	// Paths + filenames
	var projectRoot = '../../../../../';
	var themePackage = './system/server/packages/' + deploymentName + '/';
	var projectData = JSON.parse(fs.readFileSync('./application/database/config.json'))
	var activeTheme = projectData.theme.activeTheme;

	var srcContent = '';

	var filetypes = {
		img : '.{jpeg,jpg,png,gif,svg,cur,ico}',
		font : '.{eot,ttf,otf,woff,woff2,svg}',
		video : '.{mp4,ogv,webm}',
		audio : '.{wav,mp3}'
	}

	function downloadFile(uri, folderName, filename, callback){
		download(uri, {
			directory: 'application/deployment/' + deploymentName + '/libs',
			filename: filename
		}, function(err){
			if (err) throw err;
			callback();
		})
	};

	function findScriptSrc(contents) {
		var m;
		var regex = /<script[a-z1-9"'\/ =]*?src="(.*?)"/gmi;
		while ((m = regex.exec(contents)) !== null) {
			console.log(m.length)
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			// The result can be accessed through the `m`-variable.
			m.forEach((match, groupIndex) => {
				if (
					groupIndex==1
					&& match.indexOf('http')!==-1
					&& match.indexOf('https://www.googletagmanager.com')==-1
					&& match.indexOf('jquery')==-1
				) {
					// console.log(`Found match, ${match}`);
					// var filename = match.substring(match.lastIndexOf('/')+1);
					// downloadFile(match, filename, function() {
					// 	console.log('downloaded')
					// });
					console.log(regex.lastIndex)
				}
			});
		}
		gulp.src('application/deployment/' + deploymentName + '/libs')
			.pipe(concat('libs.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('application/deployment/' + deploymentName))
	}

	function downloadJsLibs(src, dist) {
		var done = done || false;
		gulp.src(src)
			.pipe(tap(function (file) {
				var contents = file.contents.toString();
				findScriptSrc(contents);
			}))
			.pipe(gulp.dest(dist))
			// .on('end', gulpif(done, done));
			done && done();
	}

	function copyAssets(src, dist, done) {
		var done = done || false;
		gulp.src(src)
			.pipe(gulp.dest(dist))
			// .on('end', gulpif(done, done));
			done();
	}

	function compileJS(src, name, dist, done) {
		var done = done || false;
		gulp.src(src)
			.pipe(prettyError())
			.pipe(concat(name))
			.pipe(uglify())
			.pipe(gulp.dest(dist))
			// .on('end', gulpif(done, done));
			done();
	}

	function compileCSS(src, name, dest, useSass, done) {
		useSass = useSass || false;
		gulp.src(src)
			.pipe(useSass ? sass({outputStyle: 'compressed'}).on('error', sass.logError) : cleanCSS())
			.pipe(concat(name))
			.pipe(rename(name))
			.pipe(gulp.dest(dest))
			done();
	}

	function compileHTML(src, name, dist, done) {
		gulp.src(src)
			.pipe(tap(function (file) {
				// Inject theme
				var template = fs.readFileSync('system/server/packages/GSMA/template_view.php', 'utf8');
				var contents = template.replace('<!-- ##MAINFILE## -->', file.contents);
				// String replacement names
				var template_name = projectData.project.template_name;
				var template_shortname = projectData.project.template_shortname;
				var template_description = projectData.project.template_description;
				var base_url = projectData.project.base_url;
				// Replace
				contents = contents.replace(/<!--##TEMPLATESHORTNAME##-->/g, template_shortname)
				contents = contents.replace(/<!--##TEMPLATENAME##-->/g, template_name)
				contents = contents.replace(/<!--##TEMPLATEDESC##-->/g, template_description)
				contents = contents.replace(/<!--##BASEURL##-->/g, base_url)
				// Buffer back to the stream
				file.contents = Buffer.from(contents);
			}))
			.pipe(rename(name))
			.pipe(gulp.dest(dist))
	}

	function CompileTemplateFiles(src, dist, done) {
		gulp.src(src)
			.pipe(tap(function (file) {
				var contents = file.contents.toString();
				// String replacement names
				var template_name = projectData.project.template_name;
				var template_shortname = projectData.project.template_shortname;
				var template_description = projectData.project.template_description;
				var base_url = projectData.project.base_url;
				// Replace
				contents = contents.replace(/<!--##TEMPLATESHORTNAME##-->/g, template_shortname)
				contents = contents.replace(/<!--##TEMPLATENAME##-->/g, template_name)
				contents = contents.replace(/<!--##TEMPLATEDESC##-->/g, template_description)
				contents = contents.replace(/<!--##BASEURL##-->/g, base_url)
				// Buffer back to the stream
				file.contents = Buffer.from(contents);
			}))
			.pipe(gulp.dest(dist))
	}

	// Build GSMA plugin from theme
	gulp.task('buildpatterns/gsmaplugin', function(done) {
		
		// Copy assets - images, videos, etc.
		copyAssets([
				'application/src/**/*' + filetypes.img,
				'application/src/**/*' + filetypes.font,
				'application/src/**/*' + filetypes.video,
				'application/src/**/*' + filetypes.audio
		], 'application/deployment/' + deploymentName,
		done);

		downloadJsLibs('./application/src/index.html', 'application/deployment/' + deploymentName)

		// Compile all JS libs and src
		compileJS('application/dist/app.min.js',
			'app.min.js',
			'application/deployment/' + deploymentName,
		done);

		// Compile all CSS libs and src
		compileCSS([
			'application/dist/style.min.css'
		],
			'style.min.css',
			'application/deployment/' + deploymentName,
			false,
		done);

		// Compile HTML
		compileHTML(
			'./application/src/index.html',
			'template_view.php',
			'application/deployment/' + deploymentName,
			done
		);

		// Compile plugin files, replacing strings
		CompileTemplateFiles(
			[
				themePackage + 'page_templater.php',
				themePackage + 'tenacitysidebar.php',
				themePackage + 'gsmapull.php',
				themePackage + 'plugin_template_functions.php'
			],
			'application/deployment/' + deploymentName,
			done
		);

	});

};