// 汇总所有的路由
const express = require('express');
const router = express.Router();

const home = require('./controllers/home');
const account = require('./controllers/account');
// 首页
router.get('/',home.index);
// 登录页
router.get('/login',account.login);

module.exports = router;