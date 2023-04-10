const LOAD_CURRENT_SPOT_REVIEWS = 'reviews/currentSpotReviews'

// =============== LOAD CURRENT SPOT REVIEWS =============== //
const loadCurrentSpotReviews = (reviews) => {
    return {
        type: LOAD_CURRENT_SPOT_REVIEWS,
        reviews
    }
}

export const fetchCurrentSpotReviewsThunk = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(loadCurrentSpotReviews(reviews));
    }
}

const initialState = { spot: {}, user: {} };


const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CURRENT_SPOT_REVIEWS: {
            const newState = { ...state };
            // action.reviews.forEach(review => {
            //     newState.spot[review.id] = review;
            // });
            newState.spot = action.reviews
            return newState;
        }

        default:
            return state;
    }
}
export default reviewReducer;
