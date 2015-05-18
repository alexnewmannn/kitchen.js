'use strict';

var gulp = require('gulp');
var express = require('express');

gulp.task('start', function() {
	var app = express();
	app.use(express.static(__dirname + '/..'));
	app.listen(4000);
});