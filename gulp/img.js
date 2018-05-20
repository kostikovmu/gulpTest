var gulp                = require('gulp');
var cnf                 = require('../package.json').config;
var imagemin            = require('gulp-imagemin');

gulp.task('img', function () {
  gulp.src(cnf.src.img.noCompress)
    .pipe(gulp.dest(cnf.dist.img));
  gulp.src(cnf.src.img.compress)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest(cnf.dist.img));
});

gulp.task('img:watch', function () {
  gulp.watch(cnf.dist.img, ['img']);
});