import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilters } from "../../context/Filters";
import { useModal } from "../../context/Modal";

const PriceFilterModal = () => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useFilters();

    useEffect(() => {
        setMin(minPrice);
        setMax(maxPrice);
    }, [])
    useEffect(() => {
        if (min <= 0) setMin('');
        if (max <= 0) setMax('');

    }, [min, max])

    const setValues = async () => {
        setMinPrice(min);
        setMaxPrice(max);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues();
        closeModal();
    }

    return (
        <div id="price-filter-modal-container">
            <form on onSubmit={handleSubmit}>
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
                <button>Apply</button>
            </form>
        </div>
    )
}
export default PriceFilterModal;
