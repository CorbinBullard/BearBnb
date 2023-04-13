import { useDispatch } from "react-redux";
import { deleteCurrentSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";
const SpotDeletePrompt = ({ spot }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // dispatch(deleteCurrentSpotThunk(spotId));
    const deleteSpot = async () => {
        await dispatch(deleteCurrentSpotThunk(spot.id));
        closeModal();
    }

    return (
        <>
            <h3>Are you sure you want to remove this spot from the listings?</h3>
            <button onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </>

    )
}
export default SpotDeletePrompt;
