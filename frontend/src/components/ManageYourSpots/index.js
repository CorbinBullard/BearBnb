import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserSpots } from "../../store/spots";
import SpotCard from "../SpotCard";

const ManageYourSpots = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots.allSpots));
    useEffect(() => {
        dispatch(fetchCurrentUserSpots());
    }, [dispatch])

    if (!spots.length) return null
    return (
        <>
            <h2>Manage Your Spots</h2>
            <button>Create a New Spot</button>
            <div id="manage-all-spots-container">
                {spots.map(spot => (
                    <div className="manage-spot-container">
                        <SpotCard spot={spot} />
                        <div className="manage-spot-buttons">
                            <button>Update</button>
                            <button>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ManageYourSpots;
