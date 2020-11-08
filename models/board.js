module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      //MariaDB에 Board 테이블 생성
      //테이블의 id 는 자동으로 생성됨
      name: { type: DataTypes.STRING(30), allowNull: false, unique: true },
      isStared: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
      authority: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: "private",
      },
      background: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      charset: "utf8mb4", //한글 + 이모티콘 저장가능
      collate: "utf8mb4_general_ci", //한글 + 이모티콘 저장가능
    }
  );

  //TODO 연관관계 설정
  Board.associate = (db) => {
    db.Board.hasMany(db.Card);
  };

  return Board;
};
