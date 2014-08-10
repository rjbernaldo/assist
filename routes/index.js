var express   = require('express')
  , router    = express.Router()
  , item      = require('./item')
  , user      = require('./user');

router.get('/', function(req, res) {
  res.render('index');
});

// router.post('/users/create', user.create);
// router.get('/users/:user_id', user.read)
// router.put('/users/:user_id', user.update);
// router.delete('/users/:user_id', user.destroy);
router.post('/users/:user_id/items/create', item.create);
router.get('/users/:user_id/items', item.readAll);
router.get('/users/:user_id/items/:item_id', item.read);
router.put('/users/:user_id/items/:item_id', item.update);
router.delete('/users/:user_id/items/:item_id', item.destroy);

module.exports = router;
