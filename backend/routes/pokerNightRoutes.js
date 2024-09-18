// backend/pokerNightRoutes.js
const express = require('express');
const PokerNight = require('../models/PokerNight');
const Player = require('../models/Player');

const router = express.Router();

router.post('/', async (req, res) => {
	const { date, place, totalPot, players } = req.body;
  
	try {
	  // Create a new PokerNight instance
	  const pokerNight = new PokerNight({
		date,
		place,
		players: [],
		totalPot,
	  });
  
	  for (const player of players) {
		const foundPlayer = await Player.findOne({ name: player.name });
		if (!foundPlayer) {
			const newPlayer = new Player({
				name: player.name,
				totalProfit: player.profit,
				nightNumber: 1,
			});
			await newPlayer.save();

			// Add the player to the poker night
			pokerNight.players.push({ playerName: newPlayer.name, profit: player.profit });
		} else {
			// Add the player to the poker night
			pokerNight.players.push({ playerName: foundPlayer.name, profit: player.profit });

			// Update player's total profit
			foundPlayer.totalProfit += player.profit; // Add the profit from this poker night
			await foundPlayer.save(); // Save the updated player

			// Update player's poker night count
			foundPlayer.pokerNights += 1
			await foundPlayer.save();
		}
	  }

  
	  // Save the poker night
	  await pokerNight.save();
	  res.status(201).send(pokerNight);
	} catch (error) {
	  res.status(400).send(error);
	}
});

  // Get all poker nights
router.get('/', async (req, res) => {
	try {
	  const pokerNights = await PokerNight.find();
	  res.status(200).send(pokerNights);
	} catch (error) {
	  res.status(500).send(error);
	}
  });
  
// Get a specific poker night by ID
router.get('/:id', async (req, res) => {
	try {
		const pokerNight = await PokerNight.findById(req.params.id).populate('players.playerId');
		if (!pokerNight) {
		return res.status(404).send({ message: 'Poker night not found' });
		}
		res.status(200).send(pokerNight);
	} catch (error) {
		res.status(500).send(error);
	}
});  

module.exports = router;