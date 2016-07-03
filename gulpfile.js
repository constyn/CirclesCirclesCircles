var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        root: 'game/',
        port: 8484,
    });
});
