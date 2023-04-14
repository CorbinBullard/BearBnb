import { useState } from "react"
import { useDispatch } from "react-redux";
import "./SpotCard.css"
import { useHistory } from "react-router-dom";
const SpotCard = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [tooltipActive, setTooltipActive] = useState(false);
    let delay;

    const showTooltip = () => {
        delay = setTimeout(() => {
            setTooltipActive(true);
        }, 1000);
    }

    const hideTooltip = () => {
        clearInterval(delay);
        setTooltipActive(false);
    }

    const handleClick = () => {
        history.push(`/spots/${spot.id}`);
    }

    return (
        <div
            className="spotCard-container"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onClick={handleClick}
        >
            <img src={spot.previewImage} className="spotCard-image" alt={spot.previewImage} />
            <div className="spotCard-info">
                <div className="SpotCard-cityState-stars">
                    <p className="spotCard-city-state">{spot.city}, {spot.state}</p>
                    <p className="spotCard-stars"><i className="fa fa-star"></i> {spot.avgRating ? spot.avgRating.toFixed(1) : "New"}</p>
                </div>
                <p className="spotCard-price">${spot.price} night</p>
            </div>
            {tooltipActive && <div className="tooltip">
                <span className="tooltiptext">
                    {spot.name}
                </span>
            </div>}
        </div>
    )
}

export default SpotCard;
