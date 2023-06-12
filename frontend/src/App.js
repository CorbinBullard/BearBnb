import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { fetchUserBookingsThunk } from "./store/bookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then().then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
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
        </Switch>
      )}
    </>
  );
}

export default App;
