const config = require('./config');
module.exports.base = (req,res,next) => {
    // 1. 设置头部信息
    res.locals.site = config.site

    next();
}