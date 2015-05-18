'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('prefix', function () {
	return gulp.src('./Assets/css/*.css')
	.pipe(autoprefixer({
		browsers: ['last 2 versions', 'ie 10'],
		cascade: false
	}))
	.pipe(gulp.dest('./dist/css'));
});