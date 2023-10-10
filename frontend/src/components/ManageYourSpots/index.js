import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SpotDeletePrompt from "./spotDeletePrompt";
import "./ManageYourSpots.css"
import Loader from "../Loader";
import { useModal } from "../../context/Modal";

const ManageYourSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots.allSpots));

    const [isLoading, setIsLoading] = useState(false);
    const { setModalContent, closeModal } = useModal();
    useEffect(() => {
        async function getSpot() {
            setIsLoading(true);
            await dispatch(fetchCurrentUserSpots());
            setIsLoading(false);
            closeModal();
        }
        getSpot();
    }, [])

    const createSpot = () => {
        history.push("/spots/new");
    }

    const handleUpdate = spotId => {
        history.push(`/spots/${spotId}/edit`);
    }
    if (!spots.length) return (
        <button onClick={createSpot}>Create a New Spot</button>
    )
    return (isLoading ? setModalContent(<Loader />) :
        <div id="manage-your-spots-container">
            <h2>Manage Your Spots</h2>
            <div id="manage-all-spots-container">
                {spots.map(spot => (
                    <div className="manage-spot-container" key={spot.id}>
                        <SpotCard spot={spot} />
                        <div className="manage-spot-buttons">
                            <button onClick={() => handleUpdate(spot.id)}>Update</button>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<SpotDeletePrompt spot={spot} />}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ManageYourSpots;
