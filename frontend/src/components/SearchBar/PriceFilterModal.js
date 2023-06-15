import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PriceFilterModal = () => {
    
    const dispatch = useDispatch();
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    return (
        <div id="price-filter-modal-container">
            <label>Min Price</label>
            <input
                placeholder="Min Price"
                type="number"
                value={min}
                onChange={e => setMin(e.target.value)}
            />
            <label>Min Price</label>
            <input
                placeholder="Max Price"
                type="number"
                value={max}
                onChange={e => setMax(e.target.value)}
            />
        </div>
    )
}
export default PriceFilterModal;
