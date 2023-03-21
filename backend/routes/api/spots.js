const express = require('express');
const { Op } = require('sequelize');
const app = require('../../app');
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models');
const review = require('../../db/models/review');
const spot = require('../../db/models/spot');
const { requireAuth } = require('../../utils/auth.js');
const { route } = require('./session');



//Get Spots From Current User
router.get('/current', async (req, res) => {

    const {user} = req;

    const Spots = [];

    const spots = await Spot.findAll({
        where: {ownerId: user.id}
    })
    //  spots.forEach(async (spot) => {
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        //Get star Reivews
        let sum = await Review.sum('stars', {
            where: {
                spotId: spot.id
            }
        })
        let count = await Review.count({ where: { spotId: spot.id } })

        //Get image url
        const image = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
                spotId: spot.id
            }
        })
        const url = image === null ? null : image.dataValues.url
        console.log("URL :  ", url)

        let spotObj = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: sum / count,
            previewImage: url
        }
        // console.log(spotObj)
        Spots.push(spotObj)
    };

    // console.log(Spots)


    res.json({ Spots });

});

//Get Spot from :SpotId
router.get('/:spotId', async (req, res) => {
    
})

//Get ALL Spots
router.get('/', async (req, res) => {

    const Spots = [];

    const spots = await Spot.findAll({

    })
    //  spots.forEach(async (spot) => {
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        //Get star Reivews
        let sum = await Review.sum('stars', {
            where: {
                spotId: spot.id
            }
        })
        let count = await Review.count({ where: { spotId: spot.id } })

        //Get image url
        const image = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
                spotId: spot.id
            }
        })
        const url = image === null ? null : image.dataValues.url
        console.log("URL :  ", url)

        let spotObj = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: sum / count,
            previewImage: url
        }
        // console.log(spotObj)
        Spots.push(spotObj)
    };

    // console.log(Spots)


    res.json({ Spots });
})

//Create Spot
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
