const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation.js');
const { check } = require('express-validator');

// Get Reviews from Current User ============>
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const Reviews = [];

    const getReviews = await Review.findAll({
        attributes: ["id", "spotId",
            "userId",
            "review",
            "stars",
            "createdAt",
            "updatedAt"],
        where: { userId: user.id },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } }]
    })

    for (let i = 0; i < getReviews.length; i++) {
        const review = getReviews[i];

        const reviewImgs = await review.getReviewImages({ attributes: ['id', 'url'] })

        const previewImage = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true
            }
        })
        const spotObj = { ...review.Spot.dataValues, previewImage: previewImage.url }

        Reviews.push({
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            User: review.User,
            Spot: spotObj,
            ReviewImages: reviewImgs
        })
    }

    res.json({ Reviews })
})

// Edit a review From reviewId ============>
const validReviewData = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .custom((value, { req }) => value >= 0 && value <= 5)
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]
router.put('/:reviewId', requireAuth, validReviewData, async (req, res) => {
    const { review, stars } = req.body;
    const currReview = await Review.findByPk(req.params.reviewId);
    if (!currReview) return res.status(404).json({ message: "Review couldn't be found" });

    // check user permission
    const { user } = req;
    if (currReview.userId !== user.id) return res.status(403).json({ message: "Forbidden" });

    const rev = await currReview.update({
        review, stars
    });

    // const getReview = await Review.findByPk(rev.id, {
    //     include: { model: User}
    // })

    res.json(rev);
})

// Delete a review from reviewId
router.delete('/:reviewId', requireAuth, async (req, res) => {

    const currReview = await Review.findByPk(req.params.reviewId);
    if (!currReview) return res.status(404).json({ message: "Review couldn't be found" });

    // check user permission
    const { user } = req;
    if (currReview.userId !== user.id) return res.status(403).json({ message: "Forbidden" });

    await currReview.destroy();

    res.json({ message: "Successfully deleted" })
})

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { user } = req;
    const { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review couldn't be found" });
    if (review.dataValues.userId !== user.id) return res.status(403).json({ message: "Forbidden" });

    const newImage = await review.createReviewImage({
        url: url
    });
    const resObj = {
        id: newImage.id,
        url: newImage.url

    }


    res.json(resObj)

})

module.exports = router;
