var gulp = require('gulp');

var closureCompiler = require('google-closure-compiler').gulp();
var del = require('del');
var debug = require('gulp-debug');
var path = require('path');
var runSequence = require('run-sequence');

var paths = {
  src: './src/',
  dist: './dist/'
};

gulp.task('clean', function() {
  return del(paths.dist);
});

gulp.task('js-compile', function() {
  var appSrc = path.join(paths.src, 'js', '**', '*.js');
  var libSrc = [
    'node_modules/lodash/**/*.js',
    'node_modules/lodash/package.json'
  ];
  var destPath = path.join(paths.dist, 'js');
  var srcFiles = [...libSrc, appSrc];

  return gulp.src(srcFiles, {base: './'})
    .pipe(debug({title: '[src js]'}))
    .pipe(closureCompiler({
      compilation_level: 'SIMPLE',
      dependency_mode: 'STRICT',
      entry_point: path.join('.', 'src', 'js', 'main.js'),
      warning_level: 'VERBOSE',
      language_in: 'ECMASCRIPT6_STRICT',
      language_out: 'ECMASCRIPT5_STRICT',
      module_resolution: 'NODE',
      output_wrapper: '(function(){\n%output%\n}).call(this)',
      process_common_js_modules: true,
      js_output_file: 'output.min.js'
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('html', function() {
  var srcFiles = path.join(paths.src, '*.html');
  var destPath = path.join(paths.dist);

  return gulp.src(srcFiles)
    .pipe(gulp.dest(destPath));
});

gulp.task('build', function() {
  return runSequence(
    'clean',
    [
      'html',
      'js-compile'
    ]
  );
})
