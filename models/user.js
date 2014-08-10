module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
		password: DataTypes.STRING
  }, {
    classMethods: {
      associate:function(models) {
        User.hasMany(models.Item, {
          foreignKey: 'user'
        })
      }
    }
  });

  return User;
}
