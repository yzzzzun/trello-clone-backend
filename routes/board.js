const express = require("express");
const sequelize = require("sequelize");
const { Board, Card } = require("../models");
const { isExistBoard } = require("./boardMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const boards = await Board.findAll();
  console.log(boards);
  return res.status(200).send(boards);
});

router.post("/", async (req, res, next) => {
  try {
    const board = await Board.create({
      name: req.body.name,
      isStared: req.body.isStared,
      authority: req.body.authority,
      background: req.body.background,
    });
    return res.status(201).send(board);
  } catch (error) {
    //const err = new Error("board 데이터 입력을 확인해주세요.");
    error.status = 404;
    error.message = "board 데이터 입력을 확인해주세요.";
    next(error);
  }
});

router.get("/:boardID/cards", async (req, res) => {
  const boardCard = await Board.findOne({
    where: {
      id: req.params.boardID,
    },
    include: [
      {
        model: Card,
      },
    ],
  });

  return res.status(200).send(boardCard);
});

router.post("/:boardID/cards", isExistBoard, async (req, res, next) => {
  try {
    const card = await Card.create({
      title: req.body.title,
      description: req.body.description,
      BoardId: req.params.boardID,
    });
    return res.status(200).send(card);
  } catch (error) {
    error.status = 404;
    error.message = "card 데이터 입력을 확인해주세요.";
    next(error);
  }
});

router.put("/:boardID/cards/:cardID", isExistBoard, async (req, res, next) => {
  try {
    const updateCard = await Card.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.cardID,
        },
      }
    );

    const result = await Card.findOne({
      where: {
        id: updateCard,
      },
    });

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    error.message = "card 수정 데이터를 확인해주세요.";
    error.status = 404;
    next(error);
  }
});

router.delete("/:boardID", isExistBoard, async (req, res, next) => {
  try {
    await Board.destroy({
      where: {
        id: req.params.boardID,
      },
    });

    return res.status(200).send("success");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:boardID", async (req, res, next) => {
  try {
    const findBoard = await Board.findOne({
      where: {
        id: req.params.boardID,
      },
    });
    return res.status(200).send(findBoard);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/:boardID", isExistBoard, async (req, res, next) => {
  try {
    const updateBoard = await Board.update(
      {
        name: req.body.name,
        isStared: req.body.isStared,
        authority: req.body.authority,
        background: req.body.background,
      },
      {
        where: {
          id: req.params.boardID,
        },
      }
    );

    const result = await Board.findOne({
      where: {
        id: updateBoard,
      },
    });

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    error.message = "board 수정 데이터를 확인해주세요.";
    error.status = 404;
    next(error);
  }
});

module.exports = router;
