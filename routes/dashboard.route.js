var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

router.get('/allIViews',function(req,res){
  res.send({massage:"Api on rount allIViews"});
});

router.post('/newView',function(req,res){
  res.send({massage:"Api on rount newView"});
});

router.put('/updateView:Id',function(req,res){
  res.send({massage:"Api on rount updateView"});
});

router.delete('/deleteView:Id',function(req,res){
  res.send({massage:"Api on rount deleteView"});
});

module.exports = router;