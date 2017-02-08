// 获取 gulp
var gulp = require('gulp');

// 检测js语法错误和警告
var jshint = require('gulp-jshint');
// 获取 gulp-less 模块
var less = require('gulp-less');
// 获取gulp-concat js合并模块
var concat = require('gulp-concat');
// 获取gulp-uglify js压缩模块
var uglify = require('gulp-uglify');
// 获取gulp-rename 重命名模块
var rename = require('gulp-rename');
// 获取gulp-minify-css CSS压缩模块
var cssmin = require('gulp-minify-css');
// 自动添加浏览器厂商前缀
var autoprefixer = require('gulp-autoprefixer');

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
gulp.task('testAutoFx', function () {
    gulp.src('./css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('./css'));
});


// scripts任务会合并 js/ 目录下得所有得js文件并输出到 dist/ 目录，然后gulp会重命名、压缩合并的文件，也输出到 dist/ 目录。
gulp.task('scripts', function() {
    gulp.src('./script/fullpageslide.js')
        .pipe(rename('fullpageslide.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
    gulp.src('./css/fullpageslide.css')
        .pipe(rename('fullpageslide.min.css'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

// mincss()压缩css文件
gulp.task('testCssmin', function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function() {
    // 监听文件修改，当文件被修改则执行 less 任务
    gulp.watch('less/**.less', ['less']);
    gulp.watch(['./index.html', './package.json', './css/fullpageslide.css'], ['copy']);
});

// 复制文件到dist目录
gulp.task('copy', function() {
    gulp.src(['./css/*.css','./script/*.js'])
        .pipe(gulp.dest('./dist'));
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 less 任务和 auto 任务
gulp.task('default', ['lint', 'less', 'testAutoFx', 'testCssmin', 'auto', 'copy']);
