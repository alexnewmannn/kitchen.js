'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');

var onError = notify.onError({
	title : 'Browserify Error',
	message : '<%= error.message %>'
});

gulp.task('browserify', function () {
	return browserify({
		debug: true,
		entries: ['./App/App.js']
	}).bundle()
		.on('error', onError)
		.pipe(source('bundle.js'))
		.pipe(buffer())
		// .pipe(uglify())
		.pipe(gulp.dest('./'));
});
