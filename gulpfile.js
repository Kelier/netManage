var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    babel = require("gulp-babel"),
    fileinclude = require('gulp-file-include'),
    smushit = require('gulp-smushit'),
    svgmin = require('gulp-svgmin'),
    clean = require('gulp-clean'),
    stripDebug = require('gulp-strip-debug'),
    gulpSequence = require('gulp-sequence'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create();

gulp.task('htmlmin', function () {
    gulp.src(['assets/*'])
        .pipe(htmlmin())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/html'))
});

gulp.task('jsmin', function () {
    gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/uikit/dist/js/uikit.js',
        'bower_components/uikit/dist/js/uikit-icons.js','bower_components/requirejs/require.js',
        'node_modules/weatherstar-switch/dist/switch.js','bower_components/echarts/dist/echarts.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    gulp.src('js/*')
        .pipe(babel({
                presets:['es2015']
        }
        ))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('cssmin', function () {
    gulp.src(['bower_components/uikit/dist/css/uikit.css','lib/*.css','node_modules/weatherstar-switch/dist/switch.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
    gulp.src(['sass/*'])
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('image', function () {
    gulp.src(['image/*'])
        .pipe(smushit())
        .pipe(gulp.dest('dist/img'))
});

// 配置服务器
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        port: 3000
    });
    // or...配置代理
    /* browserSync.init({
     proxy: "127.0.0.1"
     });*/
    // 监听 html

    gulp.watch(['dist/**/*.html']).on('change', browserSync.reload);

});

gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});


gulp.task('watch', function () {
    gulp.watch('assets/*', ['htmlmin']);
    gulp.watch('js/*',['jsmin']);
    gulp.watch(['sass/*','lib/*.css'], ['cssmin']);
    gulp.watch('image/*', ['image']);
});



gulp.task('default',function (cb) {
    gulpSequence('clean',['htmlmin','jsmin','cssmin','image'],['server','watch'],cb);
});
