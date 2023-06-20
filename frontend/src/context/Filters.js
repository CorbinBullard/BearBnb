import React, { useRef, useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchQueriedSpotsThunk } from "../store/spots";

export const FiltersContext = React.createContext();

export function FiltersProvider({ children }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    useEffect(() => {
        // if (name || minPrice || maxPrice)
        dispatch(fetchQueriedSpotsThunk({name, minPrice, maxPrice}));
    }, [minPrice, maxPrice, name]);

    function resetFilters() {
        setName('')
        setMinPrice('')
        setMaxPrice('')

    }
    const values = {
        resetFilters,
        name,
        minPrice,
        maxPrice,
        setName,
        setMinPrice,
        setMaxPrice,

    }



    return (
        <>
            <FiltersContext.Provider value={values}>
                {children}
            </FiltersContext.Provider>
        </>
    )
}

export const useFilters = () => useContext(FiltersContext);
