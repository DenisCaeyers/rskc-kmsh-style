var localserver = {
    host: 'localhost',
    port: '8001',
    https: true
}

// Global Packages
var gulp = require('gulp');

// Stylesheet Packages
var sass = require('gulp-sass');

// Web Deployment packages
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');

// Stylesheet Tasks
// -- SASS Task
gulp.task('sass-dev', function () {
    return gulp.src([
        './src/**/*.scss',
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

// Web Deployment Tasks
// - Run local webserver
gulp.task('webserver', function () {
    gulp.src('.')
        .pipe(webserver({
            host: localserver.host,
            port: localserver.port,
            livereload: true,
            https: localserver.https,
            directoryListing: false
        }));
});

// Watch Tasks
gulp.task('watch', function () {
    gulp.watch('./src/**/*.scss', ['sass-dev']);
});


// Watch, development, production and deployment Tasks
gulp.task('default', ['dev', 'webserver', 'watch']);
gulp.task('dev', ['sass-dev']);