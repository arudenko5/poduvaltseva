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
    gulpFilter = require('gulp-filter'),
    mainBowerFiles = require('main-bower-files'),
    gulpConcat = require('gulp-concat'),
    gulpUglify = require('gulp-uglify'),
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
        svg: './source/svg/*.svg',
        js: './source/js/*.js',
        vendor: './source/vendor/'
    },
    build: {
        html: './',
        styles: './css/',
        svg: './svg/',
        js: './js/',
        fonts: './fonts/',
        pics: './img/'
    },
    watch: {
        html: './index.html',
        styles: './source/scss/**/*.scss',
        js: './source/js/**/*.js'
    },
    bower: {
        style: "source/vendor/",
        js: "source/vendor/"
    }
};
gulp.task('buildHtml', function(){
    return gulp
        .src(pathes.src.html)
        .pipe(reload({stream: true}));
});

gulp.task('buildScripts', function(){
    return gulp
        .src(pathes.src.js)
        .pipe(gulpUglify())
        .pipe(gulp.dest(pathes.build.js))
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

/**
 * Сборка боверовских файлов в файлы-вендоры */
gulp.task('bower', function(){

    var jsFilter = gulpFilter('**/*.js',{restore: true});
    var cssFilter = gulpFilter('**/*.css',{restore: true});
    var fontsFilter = gulpFilter([
        '**/*.otf',
        '**/*.eot',
        '**/*.svg',
        '**/*.ttf',
        '**/*.woff',
        '**/*.woff2'
    ],{restore: true});
    var picsFilter = gulpFilter([
        '**/*.gif',
        '**/*.png'
    ],{restore: true});

    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(gulpUglify())
        .pipe(gulpConcat("vendors.min.js"))
        .pipe(gulp.dest(pathes.build.js))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(gulpConcat("vendors.min.css"))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }), cssnano() ]))
        .pipe(gulp.dest(pathes.build.styles))
        .pipe(cssFilter.restore)
        .pipe(fontsFilter)
        .pipe(gulp.dest(pathes.build.fonts))
        .pipe(fontsFilter.restore)
        .pipe(picsFilter)
        .pipe(gulp.dest(pathes.build.pics))
        .pipe(picsFilter.restore)
});

gulp.task('build', ['buildStyles', 'buildSvg', 'buildScripts', 'bower']);

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

    watch([pathes.watch.js], function(event, cb) {
        gulp.start('buildScripts');
    });
});