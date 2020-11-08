const express = require("express");
const { Board, Card } = require("../models");

const router = express.Router();

router.get("/:cardID", async (req, res) => {
  const card = await Card.findOne({
    where: {
      id: req.params.cardID,
    },
  });
  res.status(200).send(card);
});

router.delete("/:cardID", async (req, res, next) => {
  try {
    await Card.destroy({
      where: {
        id: req.params.cardID,
      },
    });

    return res.status(200).send("success");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
