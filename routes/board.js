const express = require('express');
const {Board} = require('../models');

const router = express.Router();

router.get('/', async (req,res) => {
    const boards = await Board.findAll();
    console.log(boards);
    res.status(200).send(boards);
});

router.post('/',async (req, res, next) => {
    try {
        const board = await Board.create({
            name : req.body.name,
            isStared: req.body.isStared,
            authority : req.body.authority,
            background : req.body.background
        });
        res.status(201).send(board);
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;