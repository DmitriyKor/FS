const { task, series, parallel, src, dest, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()

function defaultTask(cb) {
    // place code for your default task here
    cb();
}

async function scss() {
    return src('./assets/scss/style.scss')
        .pipe(sass())
        .pipe(dest('./assets/css'))
        .pipe(browserSync.stream());
}

function syncInit() {
    browserSync.init({ server: { baseDir: './' } });
}

function watchFiles() {
    syncInit();
    watch('./assets/scss/**/*.scss', scss)
}

task('watch', watchFiles)
task('scss', scss)

exports.default = defaultTask