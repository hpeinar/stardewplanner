const config = require('easy-config');

module.exports = {
  client: 'mysql',
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    charset: 'utf8'
  },
  migrations: {
    tableName: 'planner_migrations'
  }
};
