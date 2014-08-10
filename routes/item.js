var db = require('../models');

exports.create = (function() {
	return function(req, res) {
		db.User.find({ where: { id: req.param('user_id') }}).success(function(user) {
				db.Item.create({name: req.param('name'), cost: req.param('cost')}).success(function(item) {
					item.setUser(user).success(function() {
						res.end(JSON.stringify(item.values));
					})
				});
		});
	}
})();

exports.readAll = (function() {
	return function(req, res) {
		db.User.findOrCreate({username: "rj", password: "test"});
		db.Item.findAll({ where: { UserId: req.param('user_id')}}).success(function(items) {
			res.end(JSON.stringify(items));
		})
	}
})();

exports.read = (function() {
	return function(req, res) {
		db.Item.find({ where: {id: req.param('item_id') }}).success(function(item) {
			res.end(JSON.stringify(item));
		});
	}
})();

exports.update = (function() {
	return function(req, res) {
		db.Item.find({ where: {id: req.param('item_id') }}).success(function(item) {
			item.updateAttributes({
				name: req.param('name'),
				cost: req.param('cost')
			})
			res.end('item has been updated');
		});
	}
})();

exports.destroy = (function() {
	return function(req, res) {
		db.Item.find({ where: {id: req.param('item_id') }}).success(function(item) {
			item.destroy().success(function() {
				res.end('item has been destroyed')
			})
		});
	}
})();
