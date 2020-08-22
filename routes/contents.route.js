var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contents', { title: 'Express' });
});

router.get('/allItems',function(req,res){
  res.send({massage:"Api on rount allItems"});
});

router.post('/newItem',function(req,res){
  res.send({massage:"Api on rount newItem"});
});

router.put('/editItem:Id',function(req,res){
  res.send({massage:"Api on rount editItem"});
});

router.delete('/deleteItem:Id',function(req,res){
  res.send({massage:"Api on rount deleteItem"});
});

module.exports = router;
