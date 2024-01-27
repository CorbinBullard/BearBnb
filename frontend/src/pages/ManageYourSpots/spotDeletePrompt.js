import { useDispatch } from "react-redux";
import { deleteCurrentSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";
import "./ManageYourSpots.css";

const SpotDeletePrompt = ({ spot }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // dispatch(deleteCurrentSpotThunk(spotId));
    const deleteSpot = async () => {
        await dispatch(deleteCurrentSpotThunk(spot.id));
        closeModal();
    }

    return (
        <div id="delete-spot-modal-container">
            <h3>Are you sure you want to remove this spot from the listings?</h3>
            <button id="delete-spot-button" onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button id="keep-spot-button" onClick={closeModal}>No (Keep Spot)</button>
        </div>

    )
}
export default SpotDeletePrompt;
