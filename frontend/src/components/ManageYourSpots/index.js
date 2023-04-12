import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCurrentSpotThunk, fetchCurrentUserSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import { useHistory } from "react-router-dom";


const ManageYourSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots.allSpots));
    useEffect(() => {
        dispatch(fetchCurrentUserSpots());
    }, [dispatch])

    const createSpot = () => {
        history.push("/spots/new");
    }
    const handleDeleteSpot = (spotId) => {
        dispatch(deleteCurrentSpotThunk(spotId));
    }

    if (!spots.length) return null
    return (
        <>
            <h2>Manage Your Spots</h2>
            <button onClick={createSpot}>Create a New Spot</button>
            <div id="manage-all-spots-container">
                {spots.map(spot => (
                    <div className="manage-spot-container">
                        <SpotCard spot={spot} />
                        <div className="manage-spot-buttons">
                            <button>Update</button>
                            <button onClick={() => handleDeleteSpot(spot.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ManageYourSpots;
