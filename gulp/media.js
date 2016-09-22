// Tasks related to compilation of media
module.exports = function(CONFIG, gulp) {
  var taskId = 'media';

  // Required modules
  var browsersync = require('browser-sync');
  //var imagemin = require('gulp-imagemin');
  var path = require('path');
  var size = require('gulp-size');

  // Paths
  var src = path.join(CONFIG.PATHS.SRC, CONFIG.PATHS.MEDIA, '**/*');
  var dist = path.join(CONFIG.PATHS.DIST, CONFIG.PATHS.MEDIA);

  // Build media
  gulp.task(CONFIG.PREFIX_BUILD + taskId, function() {
    return gulp.src(src, { since: gulp.lastRun('build-media') })
      //.pipe(imagemin(CONFIG.IMAGEMIN_OPTIONS))
      .pipe(gulp.dest(dist))
      .pipe(size({ showFiles: true }))
      .pipe(browsersync.reload({ stream: true }));
  });

  // Watch for media changes
  gulp.task(CONFIG.PREFIX_WATCH + taskId, function(cb) {
    gulp.watch(src, gulp.series(CONFIG.PREFIX_BUILD + taskId));
    cb();
  });
};
