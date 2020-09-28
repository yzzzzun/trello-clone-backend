const Sequelize = require("sequelize");
// 배포시 production으로 설정함
const env = process.env.NODE_ENV || "development";
// 현재 config 는 development
const config = require("../config/config")[env];

const db = {};

// node 와 mariaDB 연결
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Board = require("./board")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
