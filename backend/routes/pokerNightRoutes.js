const express = require('express');
const PokerNight = require('../models/PokerNight');
const Player = require('../models/Player');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
	const { date, place, totalPot, players } = req.body;

	try {
		if (!req.user.admin) {
			return res.status(403).send({ error: 'Admin privileges required' });
		}
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

				pokerNight.players.push({ playerName: newPlayer.name, profit: player.profit });
			} else {
				pokerNight.players.push({ playerName: foundPlayer.name, profit: player.profit });

				foundPlayer.totalProfit += player.profit;
				foundPlayer.nightNumber += 1;

				await foundPlayer.save();
			}
		}

		await pokerNight.save();
		res.status(201).send(pokerNight);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	try {
	  const pokerNights = await PokerNight.find();
	  res.status(200).send(pokerNights);
	} catch (error) {
	  res.status(500).send(error);
	}
  });
  
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

router.delete('/delete', auth, async (req, res) => {
	try {
		if (!req.user.admin) {
			return res.status(403).send({ error: 'Admin privileges required' });
		}
		const { id } = req.body;
		const pokerNight = await PokerNight.findOneAndDelete(id);
		for (const player of pokerNight.players) {
			const foundPlayer = await Player.findOne({ name: player.playerName });
			if (foundPlayer) {
				foundPlayer.totalProfit -= player.profit;
				foundPlayer.nightNumber -= 1;
				if (foundPlayer.nightNumber === 0) {
					await Player.deleteOne({ name: player.playerName });
				} else {
					await foundPlayer.save();
				}
			}
		}

		res.status(200).send({ message: 'Poker night deleted successfully' });
	} catch (error) {
		res.status(500).send({ message: 'Error deleting poker night', error });
	}
});

module.exports = router;