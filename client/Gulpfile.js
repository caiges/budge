const del = require('del'),
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  fs = require('fs'),
  templateCache = require('gulp-angular-templatecache'),
  connect = require('connect'),
  morgan = require('morgan'),
  serveStatic = require('serve-static'),
  http = require('http'),
  argv = require('yargs').argv;

var cssDestination = 'assets/css',
  jsDestination = 'assets/js',
  fontDestination = 'assets/fonts';

// Serve up app.
gulp.task('serve', function() {
  var app = connect()
    .use(morgan('dev'))
    .use(serveStatic('.'));

  http.createServer(app).listen(4000);
});

// Wipe out the JavaScript, Stylesheet and Web Font destinations.
gulp.task('clean', function(cb) {
  return del([jsDestination + '/**/*', cssDestination + '/**/*', fontDestination + '/**/*'], cb);
});

// Watch and rebuild JavaScript and Stylesheets.
gulp.task('default', ['clean', 'config', 'templates', 'js', 'css', 'fonts', 'serve'], function() {
  console.log('Watching development files...');
  gulp.watch(['src/js/**/*'], ['js']);
  gulp.watch(['templates/**/*.html'], ['templates']);
  gulp.watch(['src_assets/css/**/*'], ['css']);
});

// Compile templates.
gulp.task('templates', function() {
  return gulp.src('templates/**/*.html')
    .pipe(templateCache({
      root: '/templates/',
      standalone: true
    }))
    .pipe(gulp.dest('src_assets/js'));
});

// Build JavaScript files.
gulp.task('js', ['config', 'templates'], function() {
  return gulp.src([
      'bower_components/angular-messages/angular-messages.js',
      'src_assets/js/templates.js',
      'src_assets/js/config.js',
      'src_assets/js/controllers/**/*.js',
      'src_assets/js/app.js'
    ])
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(jsDestination));
});

// Build Stylesheets.
gulp.task('css', function() {
  return gulp.src([
      'src_assets/css/app.scss'
    ])
    .pipe(sass({
      errLogToConsole: false,
      onError: function(err) {
        gutil.log(err);
        gutil.beep();
      }
    }))
    .pipe(concat('all.css'))
    .pipe(gulp.dest(cssDestination));
});

// Build fonts.
gulp.task('fonts', function() {
//  return gulp.src('bower_components/uikit/fonts/**/*')
//   .pipe(gulp.dest(fontDestination));
});

// Build config.
gulp.task('config', function() {
  var configPath = argv.config || 'default';

  fs.writeFileSync('src/js/config.js', fs.readFileSync('config/' + configPath + '.js'));
});

// Build assets.
gulp.task('dist', ['clean', 'config', 'templates', 'js', 'css', 'fonts'], function() {
  return gulp.src('assets/js/all.min.js')
    .pipe(uglify({
      outSourceMap: true,
      mangle: false
    }))
    .pipe(gulp.dest('assets/js'));
});
