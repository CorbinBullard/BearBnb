import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
const DeleteReviewModal = ({ review }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // dispatch(deleteCurrentSpotThunk(spotId));
    const deleteReview = async () => {
        await dispatch(deleteReviewThunk(review.id));
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
