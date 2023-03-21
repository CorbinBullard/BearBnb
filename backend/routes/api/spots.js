const express = require('express');
const { Op } = require('sequelize');
const app = require('../../app');
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models');
const review = require('../../db/models/review');
const spot = require('../../db/models/spot');
const { requireAuth } = require('../../utils/auth.js');

router.get('/', async (req, res) => {

    let Spots = []

    const spots = await Spot.findAll({
        include: {
            model: SpotImage,
            attributes: ['url']
        }
    })


    // console.log(allSpots)


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
