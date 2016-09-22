// Tasks used for serving project
module.exports = function(CONFIG, gulp) {
  // Required modules
  var browsersync = require('browser-sync');

  // Serves dist directory
  gulp.task('serve', function(cb) {
    browsersync.init({
      server: {
        baseDir: [CONFIG.PATHS.DIST]
      },
      ghostMode: false
    }, cb);
  });
};
