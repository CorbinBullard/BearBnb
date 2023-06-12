import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Bookings = ({spot, user}) => {
    const dispatch = useDispatch();
    // const bookings = useSelector(state => state)
    useEffect(() => {
        
    })

    return (
        <div className="booking-container">
            <div className="price-stars">
                <p id="spot-price">${spot.price} night</p>
                <p><i className="fa fa-star gold" /> {spot.avgStarRating ? spot.avgStarRating.toFixed(2) : "stars"}  <i className="fas fa-circle" />  {!spot.numReviews ? "New" : spot.numReviews === 1 ? spot.numReviews + " Review" : spot.numReviews + " Reviews"}</p>
            </div>
            {user ? (<button id="reserve-button" onClick={() => window.alert("Feature coming soon")}>Reserve</button>)
                : (<button disabled id="login-to-reserve-button">Login to reserve this spot!</button>)
            }
        </div>
    )
}
export default Bookings;
