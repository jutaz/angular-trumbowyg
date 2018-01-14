/* eslint strict:0 */
/* eslint-env es6 */
/* eslint-env node */

var templateCache = require('gulp-angular-templatecache'),
    lazypipe = require('lazypipe'),
    babel = require('gulp-babel'),
    gif = require('gulp-if'),
    path = require('path'),
    deepExtend = require('deep-extend'),
    stringEndsWith = (str, suffix) => str.indexOf(suffix, str.length - suffix.length) !== -1,
    isHtmlFile = file => stringEndsWith(file.relative, 'html');

const MODULE_NAME = 'trumbowyg',
      config = {
        bundle: {}
      };

config.bundle['angular-trumbowyg'] = {
  scripts: [
    './src/**/**/*.js',
    './src/**/*.js',
    './src/**/**/*.html',
    './src/**/*.html'
  ],
  options: {
    uglify: false,
    rev: false,
    minCSS: false,
    result: {
      type: {
        scripts: 'plain',
        styles: 'plain'
      }
    },
    order: {
      scripts: [
        'src/app.js'
      ]
    },
    transforms: {
      scripts: lazypipe()
        .pipe(() => {
          return gif(isHtmlFile, templateCache({
            transformUrl: url => {
              const filename = path.relative(`${__dirname}/src`, `${url.substr(0, url.length - 4)}.html`);
              return `${MODULE_NAME}/${filename}`;
            },
            module: MODULE_NAME
          }));
        })
        .pipe(babel, {
          presets: ['babel-fast-presets/es2015-stage1']
        })
    },
    pluginOptions: {
      'gulp-sourcemaps': {
        destPath: './',
        write: {addComment: true}
      },
      'gulp-uglify': {mangle: true}
    }
  }
};

config.bundle['angular-trumbowyg.min'] = deepExtend({
  options: {
    uglify: true
  }
}, config.bundle['angular-trumbowyg']);

module.exports = config;
