import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchQueriedSpotsThunk } from "../../store/spots";
import "./SearchBar.css"
import OpenModalButton from "../OpenModalButton";
import PriceFilterModal from "./PriceFilterModal";
import { useFilters } from "../../context/Filters";

const SearchBar = () => {
    const [_name, _setName] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const dispatch = useDispatch();

    const [selected, setSelected] = useState(false);
    const {name, setName} = useFilters();



    const submitSearch = (e) => {
        // dispatch(fetchQueriedSpotsThunk({ name }));
        setName(_name);
        _setName('')
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') submitSearch();
    }

    return (
        <div id="search-page-container">
            <div id="search-name-container">
                <input type="text"
                    value={_name}
                    onChange={e => _setName(e.target.value)}

                    onKeyDown={handleKeyDown}
                />
                <i id="search-icon" className="fas fa-search" onClick={submitSearch}></i>
            </div>
            <OpenModalButton
                buttonText={<i className="fas fa-sliders-h" />}
                modalComponent={<PriceFilterModal />}
            />
            {/* <div id="search-price-container">
                <input
                    placeholder="Min Price"
                    type="number"
                    value={min}
                    onChange={e => setMin(e.target.value)}
                />
                <input
                    placeholder="Max Price"
                    type="number"
                    value={max}
                    onChange={e => setMax(e.target.value)}
                />
            </div> */}
        </div>
    )
}
export default SearchBar;
