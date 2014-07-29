var gulp = require('gulp');
var source = require('vinyl-source-stream');
var myth = require('gulp-myth');
var browserify = require('browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');

var paths = {
  scripts: ['js/**/*.js'],
  styles: ['styles/**/*.css']
}
gulp.task('styles', function(){
  return gulp.src(['styles/variables.css', 'styles/**/*.css'])
    .pipe(concat('styles.css'))
    .pipe(myth())
    .pipe(gulp.dest('public'));
});

gulp.task('scripts', function(){
  var bundler = browserify(__dirname + '/js/app.js');
  bundler.transform(reactify);
  var bundleStream = bundler.bundle();
  bundleStream
    .pipe(source(__dirname + '/js/app.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function(){
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
})

gulp.task('default', ['styles', 'scripts']);