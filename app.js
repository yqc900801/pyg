const express = require('express');
const morgan = require('morgan');//日志
const path = require('path');
const artTemplate = require('express-art-template');
const favicon = require('express-favicon');
const createError = require('http-errors');
const Youch = require('youch');

const router = require('./routers');
const middleware = require('./middleware');
// 创建应用
const app = express();
app.listen(3000, () => console.log('--Running in 3000--'));
// 打印日志 放在中间件最前面
// app.use(morgan('dev'));
// 把日志写到文件里面
// 【1】
const fs = require('fs');
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' });
// // setup the logger
// app.use(morgan('dev', { stream: accessLogStream }))

// 【2】
// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { 
        return res.statusCode < 400 
    }
}))
// log all requests to access.log
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

// // 静态资源
app.use('/', express.static(path.join(__dirname, 'public')));
// // 解析请求数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 模板引擎
app.engine('art', artTemplate);
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
// 网站小图标
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
// 配置公用中间件
app.use(middleware.base);
// 引入设置的路由
app.use(router);
// 错误
app.use((req, res, next) => {
    next(createError(404, 'not found'));
});

app.use((err, req, res, next) => {
    const env = req.app.get('env');
    // 开发环境错误
    if (env === 'development') {
        const youch = new Youch(err, req);
        return youch.toHTML().then((html) => {
            res.send(html)
        })
    }
    // 生产环境错误
    res.status(err.status || 500);
    res.locals.status = err.status === 404 ? 404 : 500;
    res.render('error.art')
});




