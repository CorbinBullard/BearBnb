import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentSpotThunk } from "../../store/spots";
import { useParams } from "react-router-dom";
import "./SpotDetails.css"
import { fetchCurrentSpotReviewsThunk } from "../../store/reviews";
const SpotDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.spot.Reviews)
    // console.log("PARAMS: ",params)

    useEffect(() => {
        console.log("SPOT DETAILS USE EFFECT")
        dispatch(fetchCurrentSpotThunk(params.spotId));
        dispatch(fetchCurrentSpotReviewsThunk(params.spotId));
    }, [dispatch, params.spotId])

    if (!Object.entries(spot).length) return null;



    return (
        <div id="spot-details-container">
            <div className="name-location">
                <h3 className="spot-name">{spot.name}</h3>
                <h4 className="spot-location">{spot.city}, {spot.state}, {spot.country}</h4>
            </div>
            <div id="photo-container">
                <img className="previewImage" src={spot.SpotImages.find(image => image.preview === true)} alt="previewImage" />
                <div className="otherImages">
                    {spot.SpotImages.map(spot => (
                        <img src={spot.url} />
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
                        <p>{spot.price}</p>
                        <p>{spot.avgStarRating ? spot.avgStarRating : "stars"} {spot.numReviews ? spot.numReviews + " reviews" : "New"}</p>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div id="reviews-container">
                <h3>{spot?.avgStarRating ? spot.avgStarRating : "stars"} {spot.numReviews} reviews</h3>
                {reviews?.map(review => (
                    <div className="review-card" key={review.id}>
                        <h4 className="review-card-user">{review.User.firstName} {review.User.lastName}</h4>
                        <h5 className="review-card-date">{new Date(review.createdAt).toLocaleDateString()}</h5>
                        <p className="review-card-review">{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SpotDetails;
