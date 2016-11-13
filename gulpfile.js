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

var path = {
    src: {
        styles: './source/scss/style.scss'
    },
    build: {
        styles: './css/'
    },
    watch: {
        styles: './source/scss/**/*.scss'
    }
};

gulp.task('buildStyles', function () {
    gulp.src(path.src.styles)
        .pipe( sass() )
        .pipe( sourcemaps.init() )
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest(path.build.styles))
        .pipe(postcss([cssnano()]))
        .pipe(rename("style.min.css"))
        .pipe( sourcemaps.write('.') )
        .pipe(gulp.dest(path.build.styles))
        .pipe(reload({stream: true}));
});

gulp.task('build', ['buildStyles']);

gulp.task('webServer', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webServer', 'watch']);

gulp.task('watch', function(){
    watch([path.watch.styles], function(event, cb) {
        gulp.start('buildStyles');
    });
});