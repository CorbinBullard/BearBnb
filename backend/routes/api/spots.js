const express = require('express');
const { Op } = require('sequelize');
const app = require('../../app');
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models');
const review = require('../../db/models/review');
const spot = require('../../db/models/spot');
const { requireAuth } = require('../../utils/auth.js');
const { route } = require('./session');
const { handleValidationErrors } = require('../../utils/validation.js');
const { check } = require('express-validator');


// Get current user

//Get Spots From Current User ===============>
router.get('/current', async (req, res) => {

    const { user } = req;

    const Spots = [];

    const spots = await Spot.findAll({
        where: { ownerId: user.id }
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

//Get Spot from :SpotId ===============>
router.get('/:spotId', async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) return res.status(404).json({ message: "Spot could not be found" })

    //Get star Reivews
    let sum = await Review.sum('stars', {
        where: {
            spotId: spot.id
        }
    })
    let count = await Review.count({ where: { spotId: spot.id } })

    //Get image url
    const url = await spot.getSpotImages({
        attributes: ['id', 'url', 'preview']
    })


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
        SpotImages: url
    }

    res.json(spotObj);
})

//Get ALL Spots ===============>
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

// Create Image for a Spot ===============>
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    // Check user permission
    const { user } = req;
    if (spot.ownerId !== user.id) return res.json({ message: "You do not have permission to change this data" })

    const img = await spot.createSpotImage({
        url,
        preview
    })
    return res.json({
        id: img.id,
        url: img.url,
        preview: img.preview
    })



})

//Create Spot ===============>

const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true, validData: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true, validData: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name mus be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors

];

router.post('/', requireAuth, validateNewSpot, async (req, res) => {
    const errors = {}
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
    res.status(201).json(newSpot)
})

//Edit a Spot
router.put('/:spotId', requireAuth, validateNewSpot, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) return res.status(404).json({ message: 'Spot could not be found' });

    // Check user permission
    const {user} = req;
    if (spot.ownerId !== user.id) return res.json({ message: "You do not have permission to change this data" })

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    await spot.update({
        address, city, state, country, lat, lng, name, description, price

    })
    res.json(spot)

})

// Delete Spot ===============>
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) return res.status(404).json({ message: 'Spot could not be found' });


    // Check user permission
    const { user } = req;
    if (spot.ownerId !== user.id) return res.json({ message: "You do not have permission to change this data" });

    await spot.destroy();
    res.json({message: "Successfully deleted"});

})

module.exports = router;
