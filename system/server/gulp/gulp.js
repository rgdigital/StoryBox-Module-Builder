'use strict';

/*
 * Read package.json contents
 */
var fs      = require("fs");
var config  = JSON.parse(fs.readFileSync('./package.json')).config;
var argv    = require('yargs').argv;
var browserSync = require('browser-sync').create()

/*
 * Config + tools
 */
var filetype = require('./tools/filetypes');
var tools = require('./tools/tools');
var database = require('./tools/database');

/*
 * Task modules
 */
var gulp = require('gulp');
var fs = require('fs');
var path = __filename + 'tasks';

/*
 * Get specified task name
 */
var taskName = argv._[0]!==undefined ? argv._[0] : 'default';

/*
 * Fire task
 */
if (taskName) {
  tools.log('Running task from tasks/'+taskName);
  require('./tasks/' + taskName)(gulp, config, tools, database, browserSync);
}

/*************************************************************************************************/

function TEMP() {

// Dependancies
var gulp        = require('gulp');
var fs          = require("fs");
var path        = require('path');
var browserSync = require('browser-sync').create();
var request     = require('request');
var http        = require('http');
var https       = require('https');
var download    = require('download-file')
var prettyError = require('gulp-prettyerror');
var sourcemaps  = require('gulp-sourcemaps');
var tap         = require('gulp-tap');
var getImageUrls = require('get-image-urls');
var sass        = require('gulp-sass');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var cleanCSS    = require('gulp-clean-css');
var debug       = require('gulp-debug');
var include     = require("gulp-include");
var html2js     = require('gulp-html2js');
var injectCSS   = require('gulp-inject-css');
var replace     = require('gulp-replace');
var uglifycss   = require('uglifycss');

// var imagemin    = require('gulp-imagemin');
// var zip         = require('gulp-zip');
// var template    = require('gulp-html-compile');
// var merge       = require('merge-stream');

// Types
var type = {};
    type.img = '.{jpeg,jpg,png,gif,svg,cur,ico}';
    type.font = '.{eot,ttf,otf,woff,woff2,svg}';
    type.video = '.{mp4,ogv,webm}';
    type.audio = '.{wav,mp3}';

var config = {
    // server: {
        // baseDir: './'
    // },
    // proxy: "http://localhost/rgdigital/StoryBox_Modules/dist/",
    // proxy: "http://localhost:8080/StoryBox_Modules/dist/",
    proxy: "http://localhost/StoryBox/StoryBox-Module-Builder/dist/",
    // proxy: "http://localhost:8080/StoryBox/StoryBox-Module-Builder/dist/",
    files: [
        './public/css/*.css'
    ],
    // browser: 'google chrome canary',
    notify: false
};

// Reload browser
function reload(done) {
  browserSync.reload();
  done();
}

// Serve files
gulp.task('serve', function(done) {

  // initialize browsersync
  browserSync.init(config);
  done();
});

/* ----------------------------------------------
 * CSS Tasks
 */
// Compile CSS / Sass
// @src source files
// @name filename
// @dest detination folder
// @useSass use Sass or CSS (default false = CSS)
function compileCss(src, name, dest, useSass, done) {
  useSass = useSass || false;
  gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(useSass ? sass({outputStyle: 'compressed'}).on('error', sass.logError) : cleanCSS())
    .pipe(concat(name))
    .pipe(sourcemaps.write())
    .pipe(rename(name))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
    done();
}

// Compile Frontend Sass
gulp.task('frontend-sass', function(done) {
  compileCss('src/public/css/scss/style.scss', 'style.min.css', 'dist/', true, done);
});

/* ----------------------------------------------
 * CSS Tasks
 */
function compileJs(src, name, dest, done) {
  gulp.src(src)
    .pipe(prettyError())
    // .pipe(debug())
    .pipe(sourcemaps.init())
    .pipe(concat(name))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename(name))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
    done();
}

// Compile Backend JS
gulp.task('frontend-js', function(done) {
  compileJs([
    'src/public/js/app.js',
    'src/public/js/**/*.js',
    '!src/public/js/app.min.js'
  ], 'app.min.js', 'dist/', done)
});

// Default
gulp.task('default', gulp.series('serve', function(done) {done()}));
// gulp.task('compile', gulp.series('css', 'js', function(done) {done()}));
gulp.task('css', gulp.series('frontend-sass', function(done) {done()}));
gulp.task('js', gulp.series('frontend-js', function(done) {done()}));

// Compile Backend JS
gulp.task('html', function(done) {
  gulp.src('src/index.html')
      .pipe(gulp.dest('dist/'))
      done();
});

gulp.task('theme-css', function(done) {
  
  var themePath = 'application/preview/themes/';
  var themeFilename = 'style.scss';

  gulp.src(themePath + '/**/public/css/' + themeFilename, { base: "." })
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest("./"))
    .on('end', done);

});

// Compile theme files
gulp.task('theme-view', function(done) {

  var themePath = 'application/preview/themes/';
  var themeFilename = 'index.html';

  function injectCSS(contents, filepath) {
    var regex = /<link ([^>]*?)href\s*=\s*(['"])([^\2]*?)\2\1*>/g;
    var inlineCss = "";
    while ((m = regex.exec(contents)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        var css = fs.readFileSync(filepath + 'public/css/' + m[3], 'utf8');
        contents = contents.replace(m[0], '<style>\n' + uglifycss.processString(css) + '\n</style>');
    }
    return contents;
  }

  gulp.src(themePath + '/**/' + themeFilename)
    // Inject
    .pipe(tap(function (file, t) {
      var contents = file.contents.toString();
      var filename = path.basename(file.path);
      var filepath = file.path.replace(filename, '');
      contents = injectCSS(contents, filepath);
      file.contents = Buffer.from(contents);
    }))
    .pipe(include())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'))
    .on('end', done);
});

/*
 * Watch for file changes and compile
 */
// HTML
gulp.task('watch:html', function () {
  gulp.watch('src/index.html', gulp.series('html', reload));
});
// CSS
gulp.task('watch:styles', function () {
  gulp.watch('src/public/css/scss/**/*.scss', gulp.series('frontend-sass'));
});
// JS
gulp.task('watch:js', function () {
  gulp.watch(['src/public/js/**/*.js'], gulp.series('frontend-js'));
});
// Watch
gulp.task('default', gulp.series(
  'serve',
  gulp.parallel('watch:styles', 'watch:js', 'watch:html')
));
}