const express = require("express");
const sequelize = require("sequelize");
const { Board } = require("../models");
const { isExistBoard } = require("./boardMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const boards = await Board.findAll();
  console.log(boards);
  res.status(200).send(boards);
});

router.post("/", async (req, res, next) => {
  try {
    const board = await Board.create({
      name: req.body.name,
      isStared: req.body.isStared,
      authority: req.body.authority,
      background: req.body.background
    });
    res.status(201).send(board);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:boardID", isExistBoard, async (req, res, next) => {
  try {
    await Board.destroy({
      where: {
        id: req.params.boardID
      }
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
        id: req.params.boardID
      }
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
        background: req.body.background
      },
      {
        where: {
          id: req.params.boardID
        }
      }
    );

    const result = await Board.findOne({
      where: {
        id: updateBoard
      }
    });

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
