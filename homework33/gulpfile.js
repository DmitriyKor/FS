const { task, series, parallel, src, dest, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()

const cssnano = require('cssnano')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')

const autoprefixer = require('autoprefixer' );

//const PLUGINS = [cssnano({ preset: 'default' })]
const PLUGINS = [autoprefixer({ overrideBrowserslist : ['last 5 versions' , '> 1%'], cascade: true })];

function scss() {
    return src('./assets/scss/style.scss')
        .pipe(sass())
        .pipe(postcss(PLUGINS))
        .pipe(dest('./assets/css'))
        .pipe(browserSync.stream());
}

function scssMin() {
    const pluginsExtended = PLUGINS.concat([cssnano({ preset: 'default' })]);
    return src('./assets/scss/style.scss' )
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(pluginsExtended) )
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./assets/css' ))
}
    

function syncInit() {
    browserSync.init({ server: { baseDir: './' } });
}

async function sync() {
    await browserSync.reload()
}

function watchFiles() {
    syncInit();
    watch('./assets/scss/**/*.scss', scss)
    watch('./*.html', sync)
    watch('./assets/js/**/*.js' , sync)
}

task('watch', watchFiles)
task('scss', scss)
task('min', scssMin)

function defaultTask(cb) {
    // place code for your default task here
    scss();
    watchFiles();
    scssMin();
    cb();
}

exports.default = defaultTask