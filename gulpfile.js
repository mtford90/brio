var gulp = require('gulp'),
  _ = require('underscore'),
  fs = require('fs'),
  runSequence = require('run-sequence'),
  plugins = require('gulp-load-plugins')();


gulp.task('build:brio:scss', function () {
  gulp.src('src/scss/main.scss')
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({remove: true}))
    .pipe(plugins.rename('style.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('build:brio:js', function () {
  return gulp.src('src/js/index.js')
    .pipe(plugins.webpack({
      externals: {
        'react': 'React',
        'jQuery': '$',
        'react-router': 'ReactRouter',
        'underscore': '_',
        'moment': 'moment',
        'async': 'async',
        'marked': 'marked',
        'react-bootstrap': 'ReactBootstrap'
      },
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }))
    .pipe(plugins.rename('bundle.js'))
    .pipe(gulp.dest('build'))
});

gulp.task('build:demo:js', function () {
  return gulp.src('demo/src/index.js')
    .pipe(plugins.webpack({
      externals: {
        'react': 'React',
        'jQuery': '$',
        'react-router': 'ReactRouter',
        'underscore': '_',
        'brio': 'brio',
        'moment': 'moment',
        'async': 'async',
        'marked': 'marked',
        'react-bootstrap': 'ReactBootstrap'
      },
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }))
    .pipe(plugins.rename('demo.js'))
    .pipe(gulp.dest('build'))
});

gulp.task('build:brio:vendor:css', function () {
  var vendorFiles = JSON.parse(fs.readFileSync('src/vendor.config.json', 'utf8'))['css'];
  return gulp.src(vendorFiles)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('vendor.css'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('build'))
});

gulp.task('build:brio:vendor:js', function () {
  var vendorFiles = JSON.parse(fs.readFileSync('src/vendor.config.json', 'utf8'))['js'];
  return gulp.src(vendorFiles)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('build'))
});

gulp.task('build:js', [
  'build:brio:js',
  'build:demo:js'
]);

gulp.task('build:scss', [
  'build:brio:scss'
]);

gulp.task('build:vendor', [
  'build:brio:vendor:js',
  'build:brio:vendor:css'
]);

gulp.task('build', [
  'build:js',
  'build:vendor',
  'build:scss'
]);

gulp.task('serve', function () {
  plugins.connect.server({
    root: 'demo'
  });
});

gulp.task('watch', ['build', 'serve'], function () {
  plugins.livereload.listen();
  gulp.watch('src/js/**/*.js', ['build:brio:js']);
  gulp.watch('demo/src/**/*.js', ['build:demo:js']);
  gulp.watch('src/scss/**/*.scss', ['build:scss']);
  gulp.watch('src/vendor.config.json', ['build:vendor']);
});

gulp.task('dist:js:concat', function () {
  return gulp.src(['build/vendor.js', 'build/bundle.js'])
    .pipe(plugins.concat('brio.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('dist:js:minify', function () {
  return gulp.src(['dist/brio.js'])
    .pipe(plugins.uglify())
    .pipe(plugins.rename('brio.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:css', function () {
  return gulp.src(['build/vendor.css', 'build/style.css'])
    .pipe(plugins.concat('brio.css'))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename('brio.min.css'))
    .pipe(gulp.dest('dist'))
});

gulp.task('dist', function () {
  runSequence(
    'build',
    'dist:js:concat',
    'dist:js:minify',
    'dist:css'
  )
});

gulp.task('default', ['watch']);