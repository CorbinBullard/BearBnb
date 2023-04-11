import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentSpotThunk } from "../../store/spots";
import { useParams } from "react-router-dom";
import "./SpotDetails.css"
import { fetchCurrentSpotReviewsThunk } from "../../store/reviews";
import { compare } from "bcryptjs";


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

    const nonPreviewImgArr = spot.SpotImages.filter(spot => spot.preview === false).slice(4);
    const previewImage = spot.SpotImages.find(image => image.preview === true);
    const previewURL = previewImage ? previewImage.url : "no-url"

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
                        <p>{spot.price} </p>
                        <p><i className="fa-solid fa-star" />{spot.avgStarRating ? spot.avgStarRating.toFixed(2) : "stars"} <i className="fas fa-circle" /> {!spot.numReviews ? "New" : spot.numReviews === 1 ? spot.numReviews + " Review" : spot.numReviews + " Reviews"}</p>
                    </div>
                    <button onClick={() => window.alert("Feature coming soon")}>Reserve</button>
                </div>
            </div>
            <div id="reviews-container">
                <h3>{spot?.avgStarRating ? spot.avgStarRating.toFixed(2) : "stars"} {!spot.numReviews ? "New" : spot.numReviews === 1 ? spot.numReviews + " Review" : spot.numReviews + " Reviews"} </h3>
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
