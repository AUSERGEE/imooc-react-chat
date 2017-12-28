const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')

const User = model.getModel('user')

Router.get('/list', function(req, res) {
    User.find({}, function(err, doc){
        return res.json(doc)
    })
})
Router.post('/register', function(req, res) {
    const {user, pwd, type} = req.body
    User.findOne({user}, function(err, doc) {
        if(doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        User.create({user, type, pwd: md5Pwd(pwd)}, function(e, d) {
            if(e) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            return res.json({code: 0})
        })
    })
})
Router.get('/info', function(req, res) {
    return res.json({code: 1})
})

// 两层md5加盐的方式
function md5Pwd(pwd) {
    const salt = 'viiv_is_good_1992!@#qasdADSAS'   
    return utils.md5(utils.md5(pwd+salt))
}
module.exports = Router