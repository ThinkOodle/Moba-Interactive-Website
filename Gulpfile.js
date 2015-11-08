/**
 * For more information see this tutorial: http://blog.webbb.be/use-jekyll-with-gulp/
 *
 * Libs import
 * --> How to install? npm install --save-dev gulp-minify-html
 * @type {[type]}
 */
var gulp = require('gulp'),
    path = require('path'),

    // CSS
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),

    // JS BUILD
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),

    // HTML
    htmlmin = require('gulp-htmlmin'),

    // Browser sync
    browserSync = require('browser-sync'),

    // Import files
    pkg = require('./package.json')

    var postcss = require('gulp-postcss');
    var lost = require('lost');
    var autoprefixer = require('autoprefixer');
    var cssnext = require('cssnext');
    var precss = require('precss');
    var pxtorem = require('postcss-pxtorem');
    var atImport = require("postcss-import");
    var fontMagician = require("postcss-font-magician");


var dist              = '/'
    , dirPublic       = '/'
    , distAssets      = dist + dirPublic + 'assets/'
    , distStylesheets = '_site/css/'
    , distJavascripts = distAssets + 'js/'
    , distImages      = distAssets + 'img/'

    , deploy          = '_site/'

    , src = ''
    , srcStylesheets = src + 'pcss/'
    , srcJavascripts = src + 'js/'
    , srcTemplates   = src + 'templates/'
;

gulp.task('css', function () {
  var processors = [
    atImport,
    fontMagician,
    lost,
    autoprefixer,
    cssnext,
    precss
  ];
  return gulp.src('./pcss/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest(distStylesheets))
    .pipe(browserSync.reload({stream:true, once: true}));
});

// -->
// HTML
// <--
gulp.task('html', ['jekyll'], function() {
    // --> Minhtml
    gulp.src([
        path.join(deploy, '*.html'),
        path.join(deploy, '*/*/*.html'),
        path.join(deploy, '*/*/*/*.html')
    ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(deploy))
        .pipe(browserSync.reload({stream:true, once: true}));
});

// -->
// Browser Sync
// <--
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./" + deploy
        }
    });
});
// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// -->
// js
// Concatenate & JS build
// <--
gulp.task('js', function () {
    gulp.src([srcJavascripts + 'plugins.js', srcJavascripts + 'main.js'])
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest(distJavascripts))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distJavascripts));
});

// -->
// Default task
// <--
gulp.task('jekyll', ['css', 'js'], function (gulpCallBack){
    var spawn = require('child_process').spawn;
    // After build: cleanup HTML
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });
});

// -->
// Default task
// <--
gulp.task('default', ['css', 'js', 'html', 'browser-sync'], function (event) {
    // --> CSS
    gulp.watch(srcStylesheets+"**", ['css']);
    --> HTML
    gulp.watch([
        '*.html',
        '*/*.md'
    ], ['html']);
    // --> Ruby
    gulp.watch(path.join(dist, '*/*.rb'), ['html']);
    // --> JS
    gulp.watch(srcJavascripts+"*.js", ['html']);

});
