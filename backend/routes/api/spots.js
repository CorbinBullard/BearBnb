const express = require('express');
const { Op, DATEONLY } = require('sequelize');
const router = express.Router();
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation.js');
const { check } = require('express-validator');





//Get Spots From Current User ===============>
router.get('/current', requireAuth, async (req, res) => {

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
        // console.log("URL :  ", url)

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

    const owner = await spot.getUser({ attributes: ['id', 'firstName', 'lastName'] });
    console.log(owner.toJSON())

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
        numReviews: count,
        avgStarRating: sum / count,
        SpotImages: url,
        Owner: owner
    }

    res.json(spotObj);
})

//Get ALL Spots ===============>
const validateQueries = [
    check('page')
        .custom((value, { req }) => value > 0)
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .custom((value, { req }) => value > 0)
        .withMessage("Size must be greater than or equal to 1"),
    // check('maxLat')
    //     .custom((value, { req }) => typeof value === 'number')
    //     .withMessage("Maximum latitude is invalid"),
    handleValidationErrors
]

router.get('/', async (req, res) => {

    const Spots = [];

    // ===== query filters
    const errors = {};
    let pagination = {};
    const where = {};

    const { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    //ERROR CHECK
    if (page && page < 1) errors.page = "Page must be greater than or equal to 1";
    if (size && size < 1) errors.size = "Size must be greater than or equal to 1";
    if (maxLat && isNaN(maxLat)) errors.maxLat = "Minimum latitude is invalid";
    if (minLat && isNaN(minLat)) errors.minLat = "Minimum latitude is invalid";
    if (maxLng && isNaN(maxLng)) errors.maxLng = "Minimum Longitude is invalid";
    if (minLng && isNaN(minLng)) errors.minLng = "Minimum Longitude is invalid";
    if (minPrice && minPrice <= 0) errors.minPrice = "Minimum price must be greater than or equal to 0";
    if (maxPrice && maxPrice <= 0) errors.maxPrice = "Maximum price must be greater than or equal to 0";

    //pagination
    const limit = size === undefined ? 20 : Number(size);
    const offset = page === undefined ? 0 : size * (page - 1);

    if (limit >= 1) pagination.limit = limit;

    if (page >= 1) pagination.offset = offset;


    // where filters
    if (minLat && maxLat) where.lat = { [Op.between]: [minLat, maxLat] }
    else {
        if (minLat) where.lat = { [Op.gte]: minLat }
        if (maxLat) where.lat = { [Op.lte]: maxLat }
    }

    if (minLng && maxLng) where.lng = { [Op.between]: [minLng, maxLng] }
    else {
        if (minLng) where.lng = { [Op.gte]: minLng }
        if (maxLng) where.lng = { [Op.lte]: maxLng }
    }
    if (minPrice && maxPrice) where.price = { [Op.between]: [minPrice, maxPrice] }
    else {
        if (minPrice) where.price = { [Op.gte]: minPrice }
        if (maxPrice) where.price = { [Op.lte]: maxPrice }
    }

    //Check errors object
    if (Object.keys(errors).length) return res.status(400).json({ message: "Bad request", errors })

    const spots = await Spot.findAll({
        ...pagination,
        where
    })

    // ^^^ query filters


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
        // console.log("URL :  ", url)

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


    res.json({
        Spots,
        page: Number(page) || 1,
        size: pagination.limit
    });
})

// Create Image for a Spot ===============>
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    // Check user permission
    const { user } = req;
    if (spot.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

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
        .isNumeric()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true, validData: true })
        .isNumeric()
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
        .isNumeric()
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
    const { user } = req;
    if (spot.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

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
    if (spot.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });

    await spot.destroy();
    res.json({ message: "Successfully deleted" });

})


// <============================= REVIEWS ====================================>
// GET REVIEWS from SpotId

router.get('/:spotId/reviews', async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

    const Reviews = [];

    const reviews = await spot.getReviews({
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
    });

    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];

        const reviewImages = await review.getReviewImages({ attributes: ['id', 'url'] });

        let obj = {
            ...review.dataValues,
            reviewImages
        }
        Reviews.push(obj)
    }

    res.json({ Reviews })
})

const validReviewData = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .custom((value, { req }) => value >= 0 && value <= 5)
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

// Create Review from Spot Id
router.post('/:spotId/reviews', requireAuth, validReviewData, async (req, res) => {
    const { review, stars } = req.body;
    const { user } = req;


    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    const pastReviews = await spot.getReviews({ where: { userId: user.id } });

    if (pastReviews.length) return res.status(403).json({ message: "User already has a review for this spot" })

    const newReview = await spot.createReview({
        review,
        stars,
        userId: user.id
    })

    const currReview = await Review.findByPk(newReview.id, {
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
    })

    res.json(currReview)

})


// <============================= BOOKINGS ====================================>

// Get all Bookings for a Spot based on SpotId =============>

router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    const { user } = req;

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    const bookings = await spot.getBookings();

    // console.log(spot.dataValues.ownerId, user.id)
    const bookingsArr = []

    if (spot.dataValues.ownerId === user.id) { // IS OWNER

        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i];

            const user = await User.findByPk(booking.dataValues.userId, {
                attributes: ['id', 'firstName', 'lastName']
            });



            const obj = {
                User: user,
                id: booking.dataValues.id,
                spotId: booking.dataValues.spotId,
                userId: booking.dataValues.userId,
                startDate: booking.dataValues.startDate,
                endDate: booking.dataValues.endDate,
                createdAt: booking.dataValues.createdAt,
                updatedAt: booking.dataValues.updatedAt
            }
            bookingsArr.push(obj);
        }

    } else {
        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i];
            const obj = {
                spotId: booking.dataValues.spotId,
                startDate: booking.dataValues.startDate,
                endDate: booking.dataValues.endDate
            }
            bookingsArr.push(obj);
        }
    }

    res.json({ Bookings: bookingsArr })

})

// Create Booking from SpotId =============>
validateDates = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a startDate"),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage("Please provide an endDate"),
    handleValidationErrors
]
router.post('/:spotId/bookings', requireAuth, validateDates, async (req, res, next) => {

    const errors = {};

    const { user } = req;
    const { startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const spot = await Spot.findByPk(req.params.spotId);

    // Check if Valid Spot
    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });
    // Check if User OWNS this Spot
    if (spot.dataValues.ownerId === user.id) return res.status(403).json({ message: "Cannot book your own Spot" })
    // Check if end Date is after start Date
    // console.log(start.getTime(), end.getTime())

    if (start.getTime() > end.getTime()) {

        errors.endDate = "endDate cannot be on or before startDate"
        res.status(400).json({ message: "Bad Request", errors })
    }

    // Check if Spot is already booked during dates
    const currentBookings = await spot.getBookings();

    for (let i = 0; i < currentBookings.length; i++) {
        const booking = currentBookings[i];

        const currStartingDate = new Date(booking.dataValues.startDate);
        const currEndingDate = new Date(booking.dataValues.endDate);

        // console.log(start.getTime(), currStartingDate.getTime(), currEndingDate.getTime())
        // console.log(start.getTime() >= currStartingDate.getTime() && start.getTime() <= currEndingDate.getTime())

        if (start.getTime() >= currStartingDate.getTime() && start.getTime() <= currEndingDate.getTime()) {
            errors.startDate = "Start date conflicts with an existing booking";

            if (end.getTime() >= currStartingDate.getTime() && end.getTime() <= currEndingDate.getTime()) {
                errors.endDate = "End date conflicts with an existing booking";
            }
            return res.status(403).json({ message: "Sorry, this spot is already booked for the specified dates", errors })
        }
        // Start date CANNOT be...
        // after startDate AND before endDate
    }

    const newSpot = await spot.createBooking({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        userId: user.id
    })

    res.json(newSpot)
})


module.exports = router;
