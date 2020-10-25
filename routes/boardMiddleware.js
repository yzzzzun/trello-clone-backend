const { Board } = require("../models");
exports.isExistBoard = async (req, res, next) => {
  const exBoard = await Board.findOne({
    where: {
      id: req.params.boardID,
    },
  });

  if (!exBoard) {
    return res.status(403).send("아이디에 해당하는 board를 찾을 수 없습니다.");
  }
  next();
};
