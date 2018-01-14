/* eslint strict:0 */
/* eslint-env es6 */
/* eslint-env node */

const gulp = require('gulp'),
      rimraf = require('gulp-rimraf'),
      path = require('path'),
      gbundle = require('gulp-bundle-assets'),
      bump = require('gulp-bump'),
      argv = require('yargs').argv,
      eslint = require('gulp-eslint'),
      DIST_PATH = 'dist/';

gulp.task('bundle', ['clean'], () => {
  return gulp.src('./bundle.config.js')
    .pipe(gbundle())
    .pipe(gbundle.results({
      dest: `./${DIST_PATH}`,
      pathPrefix: '',
      fileName: 'manifest'
    }))
    .pipe(gulp.dest(`./${DIST_PATH}`));
});

gulp.task('watch', () => {
  gbundle.watch({
    configPath: path.join(__dirname, 'bundle.config.js'),
    results: {
      dest: `./${DIST_PATH}`,
      pathPrefix: '/',
      fileName: 'manifest'
    },
    dest: path.join(__dirname, `/${DIST_PATH}`)
  });
});

gulp.task('release', ['build'], () => {
  return gulp.src('./package.json')
  .pipe(bump({type: argv.type}))
  .pipe(gulp.dest('./'));
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!public/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', () => {
  return gulp
    .src(`./${DIST_PATH}`, {
      read: false
    })
    .pipe(rimraf());
});

gulp.task('default', ['develop', 'watch']);
gulp.task('build', ['bundle']);
gulp.task('test', ['lint']);
