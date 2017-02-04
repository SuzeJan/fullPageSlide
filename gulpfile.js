// 获取 gulp
var gulp = require('gulp');

// 检测js语法错误和警告
var jshint = require('gulp-jshint');
// 获取 gulp-less 模块
var less = require('gulp-less')
    // 获取gulp-concat js合并模块
var concat = require('gulp-concat');
// 获取gulp-uglify js压缩模块
var uglify = require('gulp-uglify');
// 获取gulp-rename 重命名模块
var rename = require('gulp-rename');

// Link任务会检查 js/ 目录下得js文件有没有报错或警告
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译less
// 在命令行输入 gulp less 启动此任务
gulp.task('less', function() {
    // 1. 找到 less 文件
    gulp.src('less/**.less')
        // 2. 编译为css
        .pipe(less())
        // 3. 另存文件
        .pipe(gulp.dest('./css'))
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function() {
    // 监听文件修改，当文件被修改则执行 less 任务
    gulp.watch('less/**.less', ['less']);
    gulp.watch(['./index.html', './package.json', './css/fullpageslide.css'], ['copy']);
})

// scripts任务会合并 js/ 目录下得所有得js文件并输出到 dist/ 目录，然后gulp会重命名、压缩合并的文件，也输出到 dist/ 目录。
gulp.task('scripts', function() {
    gulp.src('./script/*.js')
        .pipe(concat('fullpageslide.js'))
        .pipe(gulp.dest('./dist/script'))
        .pipe(rename('fullpageslide.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/script'));
});

// 复制文件到dist目录
gulp.task('copy', function() {
    gulp.src(['./index.html', './package.json'])
        .pipe(gulp.dest('./dist'));
    gulp.src('./css/*.css')
        .pipe(gulp.dest('./dist/css'));
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 less 任务和 auto 任务
gulp.task('default', ['lint', 'less', 'auto', 'scripts', 'copy'])