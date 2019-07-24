const { Router } = require('express');
const router = Router();

const path = require('path');
const { unlink } = require('fs-extra');

const Game = require('../models/Game');

router.get('/', async (req, res) => {
    const games = await Game.find().sort('-_id');
    res.json(games);
});

router.post('/', async (req, res, err) => {
    try {
        const { title, availableConsole, price } = req.body;
        const imagePath = '/uploads/' + req.file.filename;
        const newGame = new Game({title, availableConsole, price, imagePath});
        await newGame.save();
        res.json({'message': 'Game Saved'});
    }catch(err) {
        console.log(err)
    }
});

router.delete('/:id', async (req, res) => {
    const game = await Game.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./backend/public/' + game.imagePath));
    res.json({message: 'Game Deleted'});
});


module.exports = router;