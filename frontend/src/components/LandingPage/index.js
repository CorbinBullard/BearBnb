import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpotsThunk } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./LandingPage.css"

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots.allSpots));

    useEffect(() => {
        dispatch(fetchAllSpotsThunk());
    }, [dispatch]);

    if (!spots) return null;

    return (
        <ul className="landingPage-spots">
            {spots.map(spot => (
                <li key={spot.id}>
                    <SpotCard spot={spot} />
                </li>
            ))}
        </ul>
    )
}
export default LandingPage;
