const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation.js');
const { check } = require('express-validator');

router.delete('/:imageId', requireAuth, async (req, res) => {

    const { user } = req;
    const image = await ReviewImage.findByPk(req.params.imageId);

    if (!image) return res.status(404).json({ message: "Review Image couldn't be found" });
    const review = await image.getReview();
    if (review.dataValues.userId !== user.id) return res.status(404).json({ message: "forbidden" });

    await image.destroy();

    res.json({ message: "Successfully deleted" });
})



module.exports = router;
