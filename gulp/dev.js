// Task to start development environment
module.exports = function(CONFIG, gulp) {
  // Builds project and then starts a dev server
  gulp.task('dev', gulp.series(
    'build',
    'serve',
    'watch'
  ));
};
