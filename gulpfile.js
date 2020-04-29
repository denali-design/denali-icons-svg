const gulp = require('gulp')
const svgSymbols = require('gulp-svg-symbols')
const rename = require("gulp-rename")
var gls = require('gulp-live-server');

gulp.task(`build`, function() {
  return gulp
    .src(`svg/*.svg`)
    .pipe(
      svgSymbols({
        templates: [
          `default-svg`
        ],
      })
    )
    .pipe(rename("denali-icons-svg.svg"))
    .pipe(gulp.dest(`dist`))
});

gulp.task(`demo`, function () {
  return gulp
    .src(`svg/*.svg`)
    .pipe(
      svgSymbols({
        templates: [
          `default-demo`
        ],
      })
    )
    .pipe(rename("demo.html"))
    .pipe(gulp.dest(`docs`))
});

gulp.task('serve', function () {
  // Site served at localhost:8888/docs/demo.html
  var server = gls.static("../denali-icons-svg", 8888);
  server.start();
});
