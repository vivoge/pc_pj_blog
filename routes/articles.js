var express = require('express');
var router = express.Router();

router.get('/add',function(req,res){
    res.render('../views/articles/articles')
});

router.post('/add',function(req,res){
    res.send('articles')
});





module.exports = router;

