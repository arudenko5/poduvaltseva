'use strict';

var autoprefixer = require('autoprefixer'),
    rename = require('gulp-rename'),
    cssnano = require('cssnano'),
    gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    precss = require('precss');
/**TODO:
 *  вотчер и лайфврелоад*/

var path = {
    src: {
        styles: './css/style.css'
    },
    build: {
        styles: './'
    },
    watch: {
        styles: './css/**/*.css'
    }
};

gulp.task('buildStyles', function () {
    gulp.src(path.src.styles)
        .pipe( sourcemaps.init() )
        .pipe(postcss([ precss(), autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest(path.build.styles))
        .pipe(postcss([cssnano()]))
        .pipe(rename("style.min.css"))
        .pipe( sourcemaps.write('.') )
        .pipe(gulp.dest(path.build.styles));
});