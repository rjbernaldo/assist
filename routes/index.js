var express   = require('express')
  , router    = express.Router()
  , db        = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MyApp' });
});

// USER SCHEMA
// router.get('/users', function(req,res) {
//   res.setHeader('Content-Type', 'application/json');
//   db.User.all().success(function(users) {
//     res.end(JSON.stringify(users));
//   })
// })
//
// router.post('/users', function(req,res) {
//   var params = req.body;
//   db.User.create(params).success(function(user,created) {
//     console.log(user.values);
//     res.end(created);
//   })
// })

router.get('/user/1/items', function(req,res) { // HARDCODED USER ID
  res.setHeader('Content-Type', 'application/json');
  db.User.findOrCreate({ username: 'rj', password: 'test'}).success(function(user, created) {
    db.User.findAll({ include: [ db.Item ] }).success(function(users) {
      res.end(JSON.stringify(users));
    })
  })
})

router.post('/user/1/items', function(req,res) {
  db.User.find(1).success(function(user) {
    db.Item.create(req.body).success(function(item){
      item.setUser(user).success(function() {
        res.end(JSON.stringify(item))
      });
    });
  });
});

module.exports = router;
