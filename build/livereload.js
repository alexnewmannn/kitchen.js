'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('livereload', function() {
	return gulp.src('./index.html')
	.pipe(livereload({start: true}));
});