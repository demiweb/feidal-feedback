const {src, dest, watch, series} = require('gulp')
const browsersync = require('browser-sync').create()
const del = require('del')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const autoprefixer = require('gulp-autoprefixer')
const include = require('gulp-include-file')

function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: 'dist/',
            index: 'index.html',
        },
        port: 3000
    })
    cb()
}

function browserSyncReload(cb) {
    browsersync.reload()
    cb()
}

function html() {
    return src('src/*.html')
        .pipe(include())
        .pipe(dest('dist/'))
}

function css() {
    return src('src/css/*.css')
        .pipe(csso())
        .pipe(dest('dist/css/'))
}

function scss() {
    return src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(dest('dist/css/'))
        .pipe(csso())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('dist/css/'))
}

function js() {
    return src('src/js/*.js')
        .pipe(dest('dist/js/'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/js/'))
}

function img() {
    return src('src/img/**/*.{jpg,png,svg}')
        .pipe(dest('dist/img/'))
}

function clean() {
    return del('dist/')
}

function watchFiles() {
    watch('src/**/*.html', series(html, browserSyncReload))
    watch('src/css/*.css', series(css, browserSyncReload))
    watch('src/scss/**/*.scss', series(scss, browserSyncReload))
    watch('src/js/**/*.js', series(js, browserSyncReload))
    watch('src/img/**/*.{jpg,png,svg}', series(img, browserSyncReload))
}

exports.default = series(
    clean,
    html,
    css,
    scss,
    js,
    img,
    browserSyncServe,
    watchFiles,
)