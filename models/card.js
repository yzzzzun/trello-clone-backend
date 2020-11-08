module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "Card",
    {
      title: { type: DataTypes.STRING(40), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  Card.associate = (db) => {
    db.Card.belongsTo(db.Board);
  };

  return Card;
};
