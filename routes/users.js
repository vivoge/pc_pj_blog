var express = require('express');
var userModel = require('../model/user.js');

var router = express.Router();

router.get('/reg',function(req,res){
 res.render('../views/user/reg',{title:'reg'})
});

router.post('/reg',function(req,res){
    userModel.create(req.body,function(err,doc){
        if(doc){
            req.session.user=doc;
            res.redirect('/');
        }else{
            res.redirect('back');
        }
    })
});

router.get('/login',function(req,res){
  res.render('../views/user/login')
});

router.post('/login',function(req,res){
  res.send('login');
});

router.get('/logout',function(req,res){
    req.session.user=null;
    res.redirect('/');
});


module.exports = router;
