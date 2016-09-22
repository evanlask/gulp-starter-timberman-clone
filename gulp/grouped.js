// Groups every individual build and watch related tasks in to a single build and watch task
module.exports = function(CONFIG, gulp) {
  // Collect task names related to build and watch (uses private api's will probaby break)
  var buildTasks = ['clean'];
  var watchTasks = [];
  for(var taskName in gulp._registry._tasks) {
    if(taskName.indexOf(CONFIG.PREFIX_BUILD) >= 0) {
      buildTasks.push(taskName);
    } else if (taskName.indexOf(CONFIG.PREFIX_WATCH) >= 0) {
      watchTasks.push(taskName);
    }
  }

  // Create a task that calls all build related tasks
  gulp.task('build', gulp.series.apply(this, buildTasks));

  // Create a task that calls all watch related tasks
  gulp.task('watch', gulp.parallel.apply(this, watchTasks));
};
