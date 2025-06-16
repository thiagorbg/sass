const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function compilaSass() {
    return gulp.src('src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/styles'))
        .pipe(browsersync.stream());
}

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('src/styles/**/*.scss', compilaSass);
    gulp.watch('./*.html').on('change', browsersync.reload);
}

// Função para comprimir imagens
function comprimeImagens() {
    return gulp.src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
}

function comprimeJS() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('build/js'));
}

exports.images = comprimeImagens; // Você poderá rodar com "gulp images"
exports.sass = compilaSass;
exports.default = browserSync;
exports.js = comprimeJS;



