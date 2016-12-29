const gulp=require("gulp");
var plugins = require('gulp-load-plugins')();

gulp.task("less",function(){
	gulp.src("./css/*.css")
		.pipe(plugins.less())
		.pipe(plugins.minifyCss())//压缩css
		.pipe(gulp.dest("./mycss/css"))

})

gulp.task("uglify",function(){
	gulp.src("./dest/js/*.js")
		.pipe(plugins.uglify())
		.pipe(gulp.dest("./dist/js"))
})





gulp.task("del",function(){
	return gulp.src("./dist/js")
		.pipe(plugins.clean())
})

//创建md5(hash)文件，防止缓存数据
gulp.task('hash',['del'],function() {
     return gulp.src(['./dest/js/*.js',"./css/*.css"])
            .pipe(plugins.rev())
            .pipe(gulp.dest('./dist/js'))
           	.pipe( plugins.rev.manifest() )//json数据
        	.pipe( gulp.dest( './rev' ) );

});


//gulp启动环境
gulp.task("server",function(){
	plugins.connect.server({
		port:9999,
		livereload:true
	})
})

gulp.task("server1",function(){
	plugins.connect.server({
		root:["./dest"],
		port:999,
		livereload:true
	})
})
//保存浏览器显示效果
gulp.task("html",function(){
	gulp.src("./dest/*.html")
		.pipe(plugins.connect.reload())
})
gulp.task("watch2",function(){
	gulp.watch("./dest/*.html",["html"])
})
gulp.task("default",["watch2","server1"])


gulp.task('revCollector', function () {
    return gulp.src(['./rev/*.json', './*.html'])
        .pipe( plugins.revCollector({
            replaceReved: true,
            dirReplacements: {                
                'dest/js/': '../dist/js/',
                "css/":"../dist/js"
            }
        }) )
        .pipe( gulp.dest('./mask') );
});
