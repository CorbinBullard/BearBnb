import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetails from "./components/SpotDetails";
import CreateNewSpot from "./components/CreateNewSpot";
import ManageYourSpots from "./components/ManageYourSpots";
import UpdateSpot from "./components/UpdateSpot";
import { clearUserBookingsAction, fetchUserBookingsThunk } from "./store/bookings";
import MyBookings from "./components/MyBookings";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      if (user) {
        console.log("HERE    ", user)
        dispatch(fetchUserBookingsThunk())
      }
      else dispatch(clearUserBookingsAction());
    }).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div id="root-container">

        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path={"/"}>
              <LandingPage />
            </Route>
            <Route path={"/spots/:id/edit"}>
              <UpdateSpot />
            </Route>
            <Route path={'/spots/new'}>
              <CreateNewSpot />
            </Route>
            <Route path={'/spots/current'}>
              <ManageYourSpots />
            </Route>
            <Route path={"/spots/:spotId"}>
              <SpotDetails />
            </Route>
            <Route>
              <MyBookings />
            </Route>
          </Switch>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
