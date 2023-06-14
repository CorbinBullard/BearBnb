import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchQueriedSpotsThunk } from "../../store/spots";
import "./SearchBar.css"

const SearchBar = () => {
    const [name, setName] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {

        if (min < 0) setMin('');
        if (max < 0) setMax('');
    }, [min, max, name])

    const submitSearch = (e) => {
        dispatch(fetchQueriedSpotsThunk({ name }));
        setName('');
        setMax('');
        setMin('')
    }

    return (
        <div id="search-page-container">
            <div id="search-name-container">
                <input type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <i id="search-icon" className="fas fa-search" onClick={submitSearch}></i>
            </div>
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
