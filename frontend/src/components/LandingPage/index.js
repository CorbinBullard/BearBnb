import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpotsThunk, fetchQueriedSpotsThunk } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./LandingPage.css"
import FiltersTags from "../SearchBar/FiltersTags";
import { useFilters } from "../../context/Filters";

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots.allSpots));
    const { name, minPrice, maxPrice } = useFilters()

    useEffect(() => {
        dispatch(fetchQueriedSpotsThunk({name, minPrice, maxPrice}));
    }, [dispatch]);

    if (!spots) return null;

    return (
        <div id="landing-page-container">
            <FiltersTags />
            <ul className="landingPage-spots">
                {spots.map(spot => (
                    <li key={spot.id}>
                        <SpotCard spot={spot} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default LandingPage;
