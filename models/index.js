if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null;

  if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    });
  } else {
    sequelize = new Sequelize("assist_development", "", "", {
			dialect:  'postgres',
			protocol: 'postgres',
			port:     '5432',
			host:     '127.0.0.1',
			logging:  false
		});
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user'),
		Item:      sequelize.import(__dirname + '/item')

    // add your other models here
  }



  /*
    Associations can be defined here. E.g. like this:
  */
  Object.keys(global.db).forEach(function(modelName) {
    if ('associate' in global.db[modelName]) {
      global.db[modelName].associate(global.db)
    }
  })
}

module.exports = global.db
