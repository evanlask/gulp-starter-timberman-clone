var CONFIG = require('./build-config');
var gulp = require('gulp');

require('./gulp/scripts')(CONFIG, gulp);
require('./gulp/styles')(CONFIG, gulp);
require('./gulp/html')(CONFIG, gulp);
require('./gulp/media')(CONFIG, gulp);
require('./gulp/clean')(CONFIG, gulp);
require('./gulp/serve')(CONFIG, gulp);
require('./gulp/grouped')(CONFIG, gulp);
require('./gulp/dev')(CONFIG, gulp);

gulp.task('default', gulp.parallel(CONFIG.DEFAULT_TASK));
