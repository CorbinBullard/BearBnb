import { useDispatch } from "react-redux";
import { deleteReviewThunk, fetchCurrentSpotReviewsThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { fetchCurrentSpotThunk } from "../../store/spots";
import "./SpotDetails.css"
const DeleteReviewModal = ({ review }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // dispatch(deleteCurrentSpotThunk(spotId));
    const deleteReview = async () => {
        await dispatch(deleteReviewThunk(review.id));
        await dispatch(fetchCurrentSpotThunk(review.spotId));
        closeModal();
    }

    return (
        <div id="delete-review-modal-container">
            <h3>Are you sure you want to delete this Review?</h3>
            <button id="delete-review-button" onClick={deleteReview}>Yes (Delete Review)</button>
            <button id="keep-review-button" onClick={closeModal}>No (Keep Review)</button>
        </div>

    )
}
export default DeleteReviewModal;
