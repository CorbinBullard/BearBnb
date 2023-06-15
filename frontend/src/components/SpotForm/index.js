import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCurrentSpotThunk } from "../../store/spots";

const SpotForm = ({ spot }) => {

    const params = useParams();
    const spotId = params.id;


    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);

    const [preview, setPreview] = useState(spot.preview);
    const [img1, setImg1] = useState(spot.img1);
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');

    const [errors, setErrors] = useState({});
    const [submitWithErrors, setSubmitWithErrors] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(fetchCurrentSpotThunk(spotId));
    }, [dispatch, params.id])


    useEffect(() => {
        const errorsObj = {}
        if (!country) errorsObj.country = "Country is required";
        if (!address) errorsObj.address = "Address is required";
        if (!city) errorsObj.city = "City is required";
        if (!state) errorsObj.state = "State is required";
        if (!lat) errorsObj.lat = "Latitude is required";
        if (!lng) errorsObj.lng = "Longitude is required";
        if (description?.length < 30) errorsObj.description = "Description needs a minimum of 30 characters";
        if (!name) errorsObj.name = "Name is required";
        if (!price) errorsObj.price = "Price is required";
        if (!preview) errorsObj.preview = "Preview image is required";
        if (preview && !isValidUrl(preview)) errorsObj.preview = "Image URL must end in .png, .jpg, or .jpeg";
        if (img1 && !isValidUrl(img1)) errorsObj.img1 = "Image URL must end in .png, .jpg, or .jpeg";
        if (img2 && !isValidUrl(img2)) errorsObj.img2 = "Image URL must end in .png, .jpg, or .jpeg";
        if (img3 && !isValidUrl(img3)) errorsObj.img3 = "Image URL must end in .png, .jpg, or .jpeg";
        if (img4 && !isValidUrl(img4)) errorsObj.img4 = "Image URL must end in .png, .jpg, or .jpeg";

        setErrors(errorsObj);


    }, [country, address, city, state, lat, lng, description, name, price])

    const isValidUrl = (url) => {
        const imageFormatTypes = ['jpg', 'jpeg', 'png'];
        const urlArr = url.split('.');
        if (imageFormatTypes.includes(urlArr[urlArr.length - 1])) return true;
        else {
            return false
        };
    }
    if (!spot) return null;

    return (
        <>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <div className="create-spot-location-container">
                <div className="create-spot-country">
                    <label htmlFor="country">Country </label>
                    {submitWithErrors && errors.country && <p className="form-errors">{errors.country}</p>}
                    <input type="text" placeholder="Country" onChange={e => setCountry(e.target.value)} value={country}></input>
                </div>
                <div className="create-spot-address">
                    <label htmlFor="address">Street Address</label>
                    {submitWithErrors && errors.address && <p className="form-errors">{errors.address}</p>}
                    <input type="text" placeholder="Address" onChange={e => setAddress(e.target.value)} value={address}></input>
                </div>
                <div className="city-state">
                    <label htmlFor="city">City</label>
                    {submitWithErrors && errors.city && <p className="form-errors">{errors.city}</p>}
                    <input type="text" placeholder="City" onChange={e => setCity(e.target.value)} value={city}></input>,
                    <label htmlFor="State">State</label>
                    {submitWithErrors && errors.state && <p className="form-errors">{errors.state}</p>}
                    <input type="text" placeholder="STATE" onChange={e => setState(e.target.value)} value={state}></input>
                </div>
                <div className="lat-lng">
                    <label htmlFor="lat">Latitude</label>
                    {submitWithErrors && errors.lat && <p className="form-errors">{errors.lat}</p>}
                    <input type="text" placeholder="Latitude" onChange={e => setLat(e.target.value)} value={lat}></input>,
                    <label htmlFor="lng">Longitude</label>
                    {submitWithErrors && errors.lng && <p className="form-errors">{errors.lng}</p>}
                    <input type="text" placeholder="Longitude" onChange={e => setLng(e.target.value)} value={lng}></input>
                </div>
            </div>
            <div className="create-spot-description">
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea id="description-input" type="textarea" placeholder="Please write at least 30 characters" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                {submitWithErrors && errors.description && <p className="form-errors">{errors.description}</p>}
            </div>
            <div className="create-spot-title">
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input type="text" placeholder="Name of your spot" onChange={e => setName(e.target.value)} value={name}></input>
                {submitWithErrors && errors.name && <p className="form-errors">{errors.name}</p>}
            </div>
            <div className="create-spot-price">
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                $ <input type="text" placeholder="Price per night (USD)" onChange={e => setPrice(e.target.value)} value={price}></input>
                {submitWithErrors && errors.price && <p className="form-errors">{errors.price}</p>}
            </div>
            <div className="create-spot-photos">
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot</p>
                <input type="text" placeholder="Preview Image URL" onChange={e => setPreview(e.target.value)} value={preview}></input>
                {submitWithErrors && errors.preview && <p className="form-errors">{errors.preview}</p>}
                <input type="text" placeholder="Image URL" onChange={e => setImg1(e.target.value)} value={img1}></input>
                {submitWithErrors && errors.img1 && <p className="form-errors">{errors.img1}</p>}
                <input type="text" placeholder="Image URL" onChange={e => setImg2(e.target.value)} value={img2}></input>
                {submitWithErrors && errors.img2 && <p className="form-errors">{errors.img2}</p>}
                <input type="text" placeholder="Image URL" onChange={e => setImg3(e.target.value)} value={img3}></input>
                {submitWithErrors && errors.img3 && <p className="form-errors">{errors.img3}</p>}
                <input type="text" placeholder="Image URL" onChange={e => setImg4(e.target.value)} value={img4}></input>
                {submitWithErrors && errors.img4 && <p className="form-errors">{errors.img4}</p>}
            </div>
        </>)
}
export default SpotForm
