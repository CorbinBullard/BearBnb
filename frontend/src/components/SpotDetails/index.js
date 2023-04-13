import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentSpotThunk } from "../../store/spots";
import { useParams } from "react-router-dom";
import { fetchCurrentSpotReviewsThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import NewReviewModal from "../NewReviewModal";
import "./SpotDetails.css"
import DeleteReviewModal from "./DeleteReviewModal";




const SpotDetails = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = Object.values(useSelector(state => state.reviews.spot));
    const user = useSelector(state => state.session.user);
    const [hasPosted, setHasPosted] = useState(false);

    useEffect(() => {
        dispatch(fetchCurrentSpotThunk(params.spotId));
        dispatch(fetchCurrentSpotReviewsThunk(params.spotId));

    }, [dispatch, params.spotId])

    useEffect(() => {
        for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];
            if (review.userId === user.id) return setHasPosted(true);
        }
        setHasPosted(false);
    }, [hasPosted, reviews]);
    console.log("reviews Array: ", reviews)


    if (!Object.entries(spot).length || !spot.SpotImages) return null;


    // const reviews = Object.values(reviews);
    const nonPreviewImgArr = spot?.SpotImages.filter(spot => {
        console.log(spot.preview)
        return spot.preview === false
    });
    console.log("NON PREV", nonPreviewImgArr);
    const previewImage = spot?.SpotImages.find(image => image.preview === true);
    const previewURL = previewImage ? previewImage.url : "no-url"


    const canPostReview = (user && spot.ownerId !== user?.id && !hasPosted);




    return (
        <div id="spot-details-container">
            <div className="name-location">
                <h3 className="spot-name">{spot.name}</h3>
                <h4 className="spot-location">{spot.city}, {spot.state}, {spot.country}</h4>
            </div>
            <div id="photo-container">
                {<img id="previewImage" src={previewURL} alt="previewImage" />}
                <div id="otherImages">
                    {nonPreviewImgArr.map(spot => (
                        <img className="non-preview-image" src={spot.url} />
                    ))}
                </div>
            </div>
            <div id="details-booking-container">
                <div className="name-description">
                    <h3 className="hosted-by">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p className="description">{spot.description}</p>
                </div>
                <div className="booking-container">
                    <div className="price-stars">
                        <p>${spot.price} night</p>
                        <p><i className="fa fa-star" /> {spot.avgStarRating ? spot.avgStarRating.toFixed(2) : "stars"} <i className="fas fa-circle" /> {!spot.numReviews ? "New" : spot.numReviews === 1 ? spot.numReviews + " Review" : spot.numReviews + " Reviews"}</p>
                    </div>
                    <button onClick={() => window.alert("Feature coming soon")}>Reserve</button>
                </div>
            </div>
            <div id="reviews-container">
                <h3><i className="fa fa-star"></i> {spot?.avgStarRating ? spot.avgStarRating.toFixed(2) : ""} {!spot.numReviews ? "New" : spot.numReviews === 1 ? spot.numReviews + " Review" : spot.numReviews + " Reviews"} </h3>
                {canPostReview && (<OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<NewReviewModal spot={spot} />}
                />)}
                {reviews?.length === 0 && canPostReview ? <p>Be the first to post a review</p> : reviews?.reverse().map(review => (
                    <div className="review-card" key={review.id}>
                        <h4 className="review-card-user">{review.User?.firstName} {review.User?.lastName}</h4>
                        <h5 className="review-card-date">{new Date(review.createdAt).toLocaleDateString()}</h5>
                        <p className="review-card-review">{review.review}</p>

                        {review.User?.id === user.id && <OpenModalButton
                            modalComponent={<DeleteReviewModal review={review} />}
                            buttonText="Delete"
                        />}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SpotDetails;
