var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

function scss (done) {
  gulp.src('./scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe( gulp.dest('./css/') )
    .pipe(browserSync.stream());
  done();
}

function sync (done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  gulp.watch('./scss/**/*.scss', scss);
  gulp.watch('./js/**/*.js', browserReload);
  gulp.watch('./**/*.html', browserReload);
}



gulp.task('default', gulp.parallel(sync, watchFiles));