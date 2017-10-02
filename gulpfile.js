var gulp = require('gulp'),
    gulpStylus = require('gulp-stylus'),
    gulpMyth = require('gulp-myth'),
    gulpPug = require('gulp-pug'),
    buildPath = './docs';

function wrapPipe(taskFn) {
    return function (done) {
        var onSuccess = function () {
            done();
        };
        var onError = function (err) {
            done(err);
        };
        var outStream = taskFn(onSuccess, onError);
        if (outStream && typeof outStream.on === 'function') {
            outStream.on('end', onSuccess);
        }
    }
}

gulp.task('default', ['img', 'styl', 'pug'], function () {
    gulp.watch('./src/**/*.styl', ['styl', 'img']);
    gulp.watch('./src/**/*.pug', ['pug']);
});

gulp.task('styl', wrapPipe(function (success, error) {
    return gulp.src('./src/**/*.styl')
        .pipe(gulpStylus().on('error', error))
        .pipe(gulpMyth({compress: true}).on('error', error))
        .pipe(gulp.dest(buildPath));
}));

gulp.task('pug', wrapPipe(function (success, error) {
    return gulp.src('./src/**/*.pug')
        .pipe(gulpPug().on('error', error))
        .pipe(gulp.dest(buildPath));
}));

gulp.task('img', wrapPipe(function (success, error) {
    return gulp.src('./src/**/*.png')
        .pipe(gulp.dest(buildPath));
}));
