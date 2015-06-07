'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(['./Assets/scss/*.scss'], ['sass']);
	gulp.watch(['./Assets/css/*.css'], ['prefix']);
	gulp.watch(['./App/**/*.js', './App/**/**/*.js'], ['lint', 'livereload', 'browserify']);
	gulp.watch(['./index.html'], ['livereload']);
});