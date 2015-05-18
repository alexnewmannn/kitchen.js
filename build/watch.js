'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {
	gulp.watch(['./Assets/scss/*.scss'], ['sass', 'livereload']);
	gulp.watch(['./Assets/css/*.css'], ['prefix']);
	gulp.watch(['./App/**/*.js', './App/**/**/*.js'], ['lint', 'livereload', 'browserify']);
	gulp.watch(['./index.html'], ['livereload']);
});