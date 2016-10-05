// Tasks related to compilation of scripts
module.exports = function(CONFIG, gulp) {
  var taskId = 'scripts';

  // Required modules
  var browsersync = require('browser-sync');
  var concat = require('gulp-concat');
  var es = require('event-stream');
  var filter = require('gulp-filter');
  var gulpif = require('gulp-if');
  var jshint = require('gulp-jshint');
  var path = require('path');
  var rename = require('gulp-rename');
  var size = require('gulp-size');
  var sourcemaps = require('gulp-sourcemaps');
  var uglify = require('gulp-uglify');

  // Paths
  var src = path.join(CONFIG.PATHS.SRC, CONFIG.PATHS.SCRIPTS, '**/*.js');
  var dist = path.join(CONFIG.PATHS.DIST, CONFIG.PATHS.SCRIPTS);

  // Find bundles that contain a file
  function find(file) {
    return CONFIG.SCRIPT_BUNDLES.filter(function(bundle) {
      // Make array of files lowercase (case insensitive)
      var lowerCaseFiles = bundle.files.map(function(f) {
        return f.toLowerCase();
      });

      // Bundle contains the file
      if(lowerCaseFiles.indexOf(file) >= 0) {
        return true;
      }

      // Bundle does not contain the file
      return false;
    });
  }

  // Build the provided script bundles
  function buildBundles(bundles) {
    // Create a stream for each script bundle being built
    var streams = bundles.map(function(bundle) {
      // Appen path to scripts folder
      var files = bundle.files.map(function(file) {
        return path.join(CONFIG.PATHS.SRC, CONFIG.PATHS.SCRIPTS, file);
      });

      // Check if bundle should be linted
      var doLint = bundle.lint === true ? true : false;

      // Create stream
      return gulp.src(files)
        .pipe(gulpif(doLint, jshint(CONFIG.JSHINT_OPTIONS)))
        .pipe(gulpif(doLint, jshint.reporter('jshint-stylish')))
        .pipe(sourcemaps.init())
        .pipe(concat(bundle.dest))
        .pipe(uglify(CONFIG.UGLIFY_OPTIONS))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist))
    });

    // Merge all bundle streams in to a single stream
    return es.merge(streams)
      .pipe(size({ showFiles: true }))
      .pipe(filter('**/*.js'))
      .pipe(size({ showFiles: true }))
      .pipe(browsersync.reload({ stream: true }))
  }

  // Build all script bundles
  gulp.task(CONFIG.PREFIX_BUILD + taskId, function() {
    return buildBundles(CONFIG.SCRIPT_BUNDLES);
  });

  // Watch for script changes
  gulp.task(CONFIG.PREFIX_WATCH + taskId, function(cb) {
    gulp.watch(src).on('change', function(filePath) {
      // Make sure the file path is relative to scripts folder
      var scriptFolderPath = path.join(CONFIG.PATHS.SRC, CONFIG.PATHS.SCRIPTS, '/');
      var file = filePath.replace(scriptFolderPath, '')

      // Make case insensitive
      var fileLowerCase = file.toLowerCase();

      // Build all bundles that contain the changed file
      return buildBundles(find(fileLowerCase));
    });
    cb();
  });
};
