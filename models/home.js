const api = require('./api');
// 通过axios既可以在浏览器端使用，也可以在nodejs中使用
module.exports.getSlider = () => {
    return api.get('/settings/home_slides')
            .then(res => res.data)
            .catch(err => Promise.reject(err))
}
