'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');

gulp.task('sass', function () {
    gulp.src('./Assets/scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            onError: function(err) {
                return notify().write(err);
            }
        }))
        .pipe(gulp.dest('./Assets/css'))
		.pipe(livereload({start: true}));
});
