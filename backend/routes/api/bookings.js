const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation.js');
const { check } = require('express-validator');


// Get all bookings From Current User =============>
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const Bookings = [];

    const bookings = await Booking.findAll({

        where: { userId: user.id },
        include: { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } }
    });
    // console.log(bookings)
    if (!bookings.length) return res.json({ Bookings: [] })

    for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];

        const previewImg = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: booking.Spot.dataValues.id,
                preview: true
            }
        })
        let spotObj;
        if (previewImg) {
            spotObj = {
                ...booking.Spot.dataValues,
                previewImage: previewImg.url

            }
        } else {
            spotObj = {
                ...booking.Spot.dataValues,
                previewImage: "No image found"
            }
        }
        // console.log(booking.startDate, booking.endDate)
        const obj = {
            id: booking.id,
            spotId: booking.spotId,
            Spot: spotObj,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }
        Bookings.push(obj)
    }


    res.json({ Bookings })

})

// Edit a booking from bookingId =============>
validateDates = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a startDate"),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage("Please provide an endDate"),
    handleValidationErrors
]

router.put('/:bookingId', requireAuth, validateDates, async (req, res) => {

    const { user } = req;
    const booking = await Booking.findByPk(req.params.bookingId);
    const { startDate, endDate } = req.body;
    const errors = {}
    const [start, end] = [new Date(startDate), new Date(endDate)]

    if (!booking) return res.status(404).json({ message: "Booking couldn't be found" });
    if (booking.dataValues.userId !== user.id) res.json({ message: "forbidden" });
    const spot = await booking.getSpot();
    //Check if start Date is AFTER endDate
    if (start.getTime() > end.getTime()) {
        errors.endDate = "endDate cannot be on or before startDate"
        res.status(400).json({ message: "Bad Request", errors })
    }

    const currStartingDate = new Date(booking.dataValues.startDate);
    const currEndingDate = new Date(booking.dataValues.endDate);

    // Check if current Spot is already booked
    const currentBookings = await spot.getBookings({ where: { id: { [Op.not]: booking.dataValues.id } } });

    // console.log(booking.dataValues.id)

    for (let i = 0; i < currentBookings.length; i++) {
        const _booking = currentBookings[i];
        // console.log(_booking.dataValues.id)

        const currStartingDate = new Date(_booking.dataValues.startDate);
        const currEndingDate = new Date(_booking.dataValues.endDate);

        if (start.getTime() >= currStartingDate.getTime() && start.getTime() <= currEndingDate.getTime()) {
            errors.startDate = "Start date conflicts with an existing booking";

            if (end.getTime() >= currStartingDate.getTime() && end.getTime() <= currEndingDate.getTime()) {
                errors.endDate = "End date conflicts with an existing booking";
            }
            res.status(403).json({ message: "Sorry, this spot is already booked for the specified dates", errors })
        }

    }

    const now = new Date(Date.now());

    if (now.getTime() > currEndingDate.getTime()) return res.json({ message: "Past bookings can't be modified" })

    if (Object.keys(errors).length) return res.status()

    const newBooking = await booking.update({
        startDate: start,
        endDate: end
    })


    res.json(newBooking)
})

// Delete a booking from BookingId =============>
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) return res.status(404).json({ message: "Booking couldn't be found" });

    if (booking.dataValues.userId !== user.id) return res.json({ message: "forbidden" });

    const now = new Date(Date.now());

    if (booking.dataValues.startDate.getTime() < now.getTime()) return res.json({ message: "Bookings that have been started can't be deleted" });

    await booking.destroy();

    res.json({ message: "Successfully deleted" })
})










module.exports = router;
