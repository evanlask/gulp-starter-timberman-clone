// Tasks related to compilation of styles
module.exports = function(CONFIG, gulp) {
  var taskId = 'styles';

  // Required modules
  var autoprefixer = require('gulp-autoprefixer');
  var browsersync = require('browser-sync');
  var filter = require('gulp-filter');
  var gutil = require('gulp-util');
  var path = require('path');
  var sass = require('gulp-sass');
  var size = require('gulp-size');
  var sourcemaps = require('gulp-sourcemaps');

  // Paths
  var src = path.join(CONFIG.PATHS.SRC, CONFIG.PATHS.STYLES, '**/*.scss');
  var dist = path.join(CONFIG.PATHS.DIST, CONFIG.PATHS.STYLES);

  // Build styles
  gulp.task(CONFIG.PREFIX_BUILD + taskId, function() {
    return gulp.src(src)
      .pipe(sourcemaps.init())
      .pipe(sass(CONFIG.SASS_OPTIONS).on('error', gutil.log))
      .pipe(autoprefixer(CONFIG.AUTO_PREFIXER_OPTIONS).on('error', gutil.log))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest(dist))
      .pipe(size({ showFiles: true }))
      .pipe(filter('**/*.css'))
      .pipe(browsersync.reload({ stream: true }));
  });

  // Watch for style changes
  gulp.task(CONFIG.PREFIX_WATCH + taskId, function(cb) {
    gulp.watch(src, gulp.series(CONFIG.PREFIX_BUILD + taskId));
    cb();
  });
};
