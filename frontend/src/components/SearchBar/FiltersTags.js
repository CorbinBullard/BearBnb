import { useFilters } from "../../context/Filters";

const FiltersTags = () => {

    const { name, setName, minPrice, maxPrice, setMinPrice, setMaxPrice } = useFilters();
    return (
        <div id="filters-container">
            {(name || minPrice || maxPrice) &&
                <p id="filters-title">Filters: </p>
            }
            {name && (
                <div className="current-filter-container"
                    onClick={() => setName('')}
                >{name} X</div>
            )}
            {minPrice && minPrice > 0 && (
                <div className="current-filter-container"
                    onClick={() => setMinPrice('')}
                >Min Price: {minPrice} X</div>
            )}
            {maxPrice && (
                <div className="current-filter-container"
                    onClick={() => setMaxPrice('')}
                >Max Price: {maxPrice} X</div>
            )}
            </div>
    )
}
export default FiltersTags;
