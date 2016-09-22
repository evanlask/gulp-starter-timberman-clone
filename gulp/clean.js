// Tasks to clean project files
module.exports = function(CONFIG, gulp) {
  // Required modules
  var del = require('del');
  var path = require('path');

  // Paths
  var dist = path.join(CONFIG.PATHS.DIST, '**/*');

  // Clean installed node modules
  gulp.task('clean-node', function() {
    return del(['node_modules']);
  });

  // Clean dist directory
  gulp.task('clean', function() {
    return del([dist]);
  });
};
