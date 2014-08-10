module.exports = function(sequelize, DataTypes) {
	var Item = sequelize.define("Item", {
		name: DataTypes.STRING,
		cost: DataTypes.STRING,
		description: DataTypes.STRING,
		location: DataTypes.STRING
	}, {
		classMethods: {
			associate:function(models) {
				Item.belongsTo(models.User);
			}
		}
	});

	return Item;
}
