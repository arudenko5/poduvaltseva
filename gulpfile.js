'use strict';

var gulp = require('gulp'),
    watch= require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    rename = require('gulp-rename'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    precss = require('precss'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    path = require('path'),
    inject = require('gulp-inject'),
    browserSync = require("browser-sync"),  // локальный сервер + работа с браузером
    reload = browserSync.reload; // обновление страницы в браузере

var config = {
    server: {
        baseDir: "./"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "poduvaltseva"
};

var pathes = {
    src: {
        html: './index.html',
        styles: './source/scss/style.scss',
        svg: './source/svg/*.svg'
    },
    build: {
        html: './',
        styles: './css/',
        svg: './svg/'
    },
    watch: {
        html: './index.html',
        styles: './source/scss/**/*.scss'
    }
};
gulp.task('buildHtml', function(){
    return gulp
        .src(pathes.src.html)
        .pipe(reload({stream: true}));
});

gulp.task('buildSvg', function () {

    var svgs = gulp
        .src(pathes.src.svg)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({inlineSvg: true}));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src(pathes.src.html)
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest(pathes.build.html));
});

gulp.task('buildStyles', function () {
    gulp.src(pathes.src.styles)
        .pipe( sass() )
        .pipe( sourcemaps.init() )
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest(pathes.build.styles))
        .pipe(postcss([cssnano()]))
        .pipe(rename("style.min.css"))
        .pipe( sourcemaps.write('.') )
        .pipe(gulp.dest(pathes.build.styles))
        .pipe(reload({stream: true}));
});

gulp.task('build', ['buildStyles', 'buildSvg']);

gulp.task('webServer', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webServer', 'watch']);

gulp.task('watch', function(){
    watch([pathes.watch.styles], function(event, cb) {
        gulp.start('buildStyles');
    });

    watch([pathes.watch.html], function(event, cb) {
        gulp.start('buildHtml');
    });
});