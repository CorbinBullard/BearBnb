const express = require('express');
const app = require('../../app');
const router = express.Router();
const { Spot } = require('../../db/models')
const { requireAuth } = require('../../utils/auth.js')

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();

    res.json(spots);
})

router.post('/', requireAuth, async (req, res) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: user.id

    })
    res.json(newSpot)
})



module.exports = router;
