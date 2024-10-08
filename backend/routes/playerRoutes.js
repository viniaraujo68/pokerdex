const express = require('express');
const Player = require('../models/Player');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {

    if (!req.user.admin) {
      return res.status(403).send({ error: 'Admin privileges required' });
    }

    const player = new Player(req.body);
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).send(players);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send({ message: 'Player not found' });
    }
    res.status(200).send(player);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/name/:name', async (req, res) => {
  try {
    const player = await Player.findOne({ name: req.params.name });
    if (!player) {
      return res.status(404).send({ message: 'Player not found' });
    }
    res.status(200).send(player);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/delete', auth, async (req, res) => {
  try {
    if (!req.user.admin) {
      return res.status(403).send({ error: 'Admin privileges required' });
    }
    const player = await Player.findOneAndDelete({ name: req.body.name });
    if (!player) {
      return res.status(404).send({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;