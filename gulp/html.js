// Tasks related to compilation of html
module.exports = function(CONFIG, gulp) {
  var taskId = 'html';

  // Required modules
  var browsersync = require('browser-sync');
  var htmlmin = require('gulp-htmlmin');
  var path = require('path');
  var size = require('gulp-size');

  // Paths
  var src = path.join(CONFIG.PATHS.SRC, '**/*.html');
  var dist = path.join(CONFIG.PATHS.DIST);

  // Build html
  gulp.task(CONFIG.PREFIX_BUILD + taskId, function(cb) {
    return gulp.src(src, { since: gulp.lastRun('build-html') })
      .pipe(htmlmin(CONFIG.HTML_MIN_OPTIONS))
      .pipe(gulp.dest(dist))
      .pipe(size({ showFiles: true }))
      .pipe(browsersync.reload({ stream: true }));
  });

  // Watch for html changes
  gulp.task(CONFIG.PREFIX_WATCH + taskId, function(cb) {
    gulp.watch(src, gulp.series(CONFIG.PREFIX_BUILD + taskId));
    cb();
  });
};
