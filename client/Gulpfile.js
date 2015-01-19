var clean = require('del'),
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  fs = require('fs'),
  templateCache = require('gulp-angular-templatecache'),
  connect = require('connect'),
  http = require('http'),
  argv = require('yargs').argv;

var cssDestination = 'assets/css',
  jsDestination = 'assets/js',
  fontDestination = 'assets/fonts';

// Serve up app.
gulp.task('serve', function() {
  var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static('.'));

  http.createServer(app).listen(4000);
});

// Wipe out the JavaScript, Stylesheet and Web Font destinations.
gulp.task('clean', function() {
  return gulp.src([jsDestination + '/**/*', cssDestination + '/**/*', fontDestination + '/**/*'], {
      read: false
    })
    .pipe(del())
});

// Watch and rebuild JavaScript and Stylesheets.
gulp.task('default', ['clean', 'config', 'templates', 'js', 'css', 'fonts', 'serve'], function() {
  console.log('Watching development files...');
  gulp.watch(['templates/**/*.html'], ['templates']);
  gulp.watch(['../repo-user-app-core/dist/js/**/*', 'src_assets/js/**/*'], ['js']);
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
      '../repo-user-app-core/dist/js/all.js',
      'bower_components/uikit/js/uikit.js',
      'bower_components/uikit/js/components/datepicker.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/angulartics/dist/angulartics.min.js',
      'bower_components/angulartics/dist/angulartics-woopra.min.js',
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
      'bower_components/uikit/css/uikit.almost-flat.css',
      'bower_components/uikit/css/components/**/*.css',
      'bower_components/angular-toggle-switch/angular-toggle-switch.css',
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
  return gulp.src('bower_components/uikit/fonts/**/*')
    .pipe(gulp.dest(fontDestination));
});

// Build config.
gulp.task('config', function() {
  var configPath = argv.config || 'default';

  fs.writeFileSync('src_assets/js/config.js', fs.readFileSync('config/' + configPath + '.js'));
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
