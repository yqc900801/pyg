const homeMoudel = require('../models/home');
module.exports.index = (req, res, next) => {
    // 首页业务
    // 1. 轮播图信息
    homeMoudel.getSlider()
        .then(data => {            
            res.locals.sliders = data; 
            console.log(res.locals.sliders) 
            res.render('home.art')
        })
        .catch(err => next(err));
}
