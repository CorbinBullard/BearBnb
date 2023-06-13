import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { postNewSpotReviewThunk, updateReviewThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import { fetchCurrentSpotThunk } from "../../store/spots";
import "./NewReviewModal.css"

const NewReviewModal = ({ spot, isUpdating, currReview }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(isUpdating ? currReview.stars : 1);
    const [activeRating, setActiveRating] = useState(isUpdating ? currReview.stars : 1);
    const [errors, setErrors] = useState({});
    const [submitWithErrors, setSubmitWithErrors] = useState(false);
    const spotId = spot.id;

    useEffect(() => {
        if (stars > 5) setStars(5);
        if (stars < 1) setStars(1)
        const errorsObj = {};
        if (review.length < 10) errorsObj.review = "Review must be at least 10 characters";

        setErrors(errorsObj);

    }, [stars, review]);

    useEffect(() => {
        if (isUpdating) {
            setReview(currReview.review);
            setStars(currReview.stars);
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(errors).length) {
            setSubmitWithErrors(true);
            return window.alert("Cannot Submit");
        }

        if (!isUpdating) {
            const promise = new Promise(resolve => resolve(dispatch(postNewSpotReviewThunk({ stars, review, spotId }))))
            promise.then(() => dispatch(fetchCurrentSpotThunk(spotId)))
            promise.then(closeModal)
            promise.then(history.push(`/spots/${spotId}`));
        } else {
            dispatch(updateReviewThunk({ id: currReview.id, stars, review }))
                .then(() => dispatch(fetchCurrentSpotThunk(spotId)))
                .then(() => closeModal());
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>How was your stay?</h2>
                <textarea
                    id="review-text-area"
                    placeholder="Leave your review here..."
                    onChange={e => setReview(e.target.value)}
                    value={review}
                ></textarea>
                <div id="">
                    <div id="star-input-container">
                        <div
                            className={activeRating >= 1 ? "filled" : "empty"}
                            onMouseEnter={() => setActiveRating(1)}
                            onMouseLeave={() => setActiveRating(stars)}
                            onClick={() => setStars(1)}
                        >
                            <i className="fa fa-star" />
                        </div>
                        <div
                            className={activeRating >= 2 ? "filled" : "empty"}
                            onMouseEnter={() => setActiveRating(2)}
                            onMouseLeave={() => setActiveRating(stars)}
                            onClick={() => setStars(2)}
                        >
                            <i className="fa fa-star" />
                        </div>
                        <div
                            className={activeRating >= 3 ? "filled" : "empty"}
                            onMouseEnter={() => setActiveRating(3)}
                            onMouseLeave={() => setActiveRating(stars)}
                            onClick={() => setStars(3)}
                        >
                            <i className="fa fa-star" />
                        </div>
                        <div
                            className={activeRating >= 4 ? "filled" : "empty"}
                            onMouseEnter={() => setActiveRating(4)}
                            onMouseLeave={() => setActiveRating(stars)}
                            onClick={() => setStars(4)}
                        >
                            <i className="fa fa-star" />
                        </div>
                        <div
                            className={activeRating >= 5 ? "filled" : "empty"}
                            onMouseEnter={() => setActiveRating(5)}
                            onMouseLeave={() => setActiveRating(stars)}
                            onClick={() => setStars(5)}
                        >
                            <i className="fa fa-star" />
                        </div>
                    </div>
                </div>
                <button disabled={Object.values(errors).length}>{isUpdating ? "Update Review" : "Submit Your Review"}</button>
            </form>
        </>
    );
}
export default NewReviewModal;
