var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('hello', function () {
    console.log('Hello, from gulp task hello')
});

gulp.task('bower-install', function () {
    return bower({
        cmd: 'install'
    });
});

gulp.task('bower-update', function () {
    return bower({
        cmd: 'update'
    });
});

var jsFiles = ['public/app/**/*.js'],
    jsDest = 'public/dist';

gulp.task('minify', function () {
    return gulp.src(jsFiles)
        .pipe(concat('angular-elastic-runner.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('angular-elastic-runner.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

