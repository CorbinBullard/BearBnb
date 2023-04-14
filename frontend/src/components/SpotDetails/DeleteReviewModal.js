import { useDispatch } from "react-redux";
import { deleteReviewThunk, fetchCurrentSpotReviewsThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { fetchCurrentSpotThunk } from "../../store/spots";
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
        <>
            <h3>Are you sure you want to delete this Review?</h3>
            <button onClick={deleteReview}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </>

    )
}
export default DeleteReviewModal;
