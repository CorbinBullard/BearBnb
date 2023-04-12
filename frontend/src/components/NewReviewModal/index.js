import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { postNewSpotReviewThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";
const NewReviewModal = ({spot}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1);
    const [errors, setErrors] = useState({});
    const [submitWithErrors, setSubmitWithErrors] = useState(false);
    const spotId = spot.id;

    useEffect(()=> {
        if (stars > 5) setStars(5);
        if (stars < 1) setStars(1)
        const errorsObj = {};
        if (review.length < 10) errorsObj.review = "Review must be at least 10 characters";

        setErrors(errorsObj);

    },[stars, review])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(errors).length) {
            setSubmitWithErrors(true);
            return window.alert("Cannot Submit");
        }
        console.log(review)

        const promise = new Promise(resolve => resolve(dispatch(postNewSpotReviewThunk({stars, review, spotId}))))
        promise.then(closeModal)
        promise.then(history.push(`/spots/${spotId}`));
    };

    console.log("REVIEW: ", review)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>How was your stay?</h2>
                <textarea
                id="review-text-area"
                placeholder="Leave your review here..."
                onChange={e=>setReview(e.target.value)}
                value={review}
                ></textarea>
                <div>
                    <i className="fa fa-star"></i>
                    <input
                    type="number"
                    onChange={e=>setStars(e.target.value)}
                    value={stars}
                    />
                </div>
                <button disabled={Object.values(errors).length}>Submit Your Review</button>
            </form>
        </>
    );
}
export default NewReviewModal;
