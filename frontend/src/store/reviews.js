import { csrfFetch } from "./csrf";

const LOAD_CURRENT_SPOT_REVIEWS = 'reviews/currentSpotReviews';
const CREATE_NEW_REVIEW = 'reviews/createNewReview';
const DELETE_REVIEW = 'reviews/deleteReview';
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
        console.log(reviews)
    }
}

// =============== CREATE NEW REVIEW FROM SPOT =============== //
const createNewReview = (review) => {
    return {
        type: CREATE_NEW_REVIEW,
        review
    }
}

export const postNewSpotReviewThunk = (newReview) => async (dispatch) => {
    const { stars, review, spotId } = newReview;
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ stars, review })
    });
    if (res.ok) {
        const review = await res.json();
        dispatch(createNewReview(review))
    }
}

// =============== DELETE REVIEW =============== //
const deleteReview = reviewId => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const deleteReviewThunk = reviewId => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });
    if (res.ok) {
        dispatch(deleteReview(reviewId));
    }
}

// REDUCER

const initialState = { spot: {}, user: {} };


const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CURRENT_SPOT_REVIEWS: {
            const newState = { spot: {}, user: {...state.user}};
            newState.spot = {}
            Object.values(action.reviews.Reviews).forEach(review => {
                newState.spot[review.id] = review;
            });
            return newState;
        }
        case CREATE_NEW_REVIEW: {
            const newState = { ...state, spot: { ...state.spot } };
            newState.spot[action.review.id] = action.review;
            return newState;
        }
        case DELETE_REVIEW: {

            const newState = { ...state, spot: { ...state.spot } }

            delete newState.spot[action.reviewId];
            return newState;
        }
        default:
            return state;
    }
}
export default reviewReducer;
