import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Homepage from "../homepage/Homepage";
import ShowList from "../shows/ShowList";
import ShowPlaylist from "../shows/ShowPlaylist";
import ShowProfile from "../shows/ShowProfile";
import ShowCalendar from "../shows/ShowCalendar";
import EditPlaylistMenu from "../shows/EditPlaylistMenu";
import EditPlaylistInfo from "../shows/EditPlaylistInfo";
import EditPlaylist from "../shows/EditPlaylist";
import EditShowInfo from "../shows/EditShowInfo";
import EditMembers from "../shows/EditMembers";
import EditMember from "../shows/EditMember";
import EditPlaylists from "../shows/EditPlaylists";
import EditShows from "../shows/EditShows";
import About from "../shows/About";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import NewPlaylist from "../shows/NewPlaylist.js";
import DJHomePage from "../homepage/DJHomePage";
import AdminHomePage from "../homepage/AdminHomePage";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );
  const { currentUser } = useContext(UserContext);
//the "/" route was originally <Homepage />
  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            {currentUser ? <Homepage /> : <ShowList /> }
          </Route>

          <Route exact path="/schedule">
            <ShowCalendar />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <Route exact path="/show/:showid">
            <ShowProfile />  
          </Route>

          <Route exact path="/show/:showid/playlist/:playlistid">
            <ShowPlaylist />  
          </Route>

          <Route exact path="/editshow/:showid">
            <EditPlaylistMenu />  
          </Route>
          
          <Route exact path="/editshow/:showid/playlistinfo/:playlistid">
            <EditPlaylistInfo />  
          </Route>
          
          <Route exact path="/editshow/:showid/playlist/:playlistid">
            <EditPlaylist />  
          </Route>

          <Route exact path="/editshow/profile/:showid">
            <EditShowInfo />
          </Route>

          <PrivateRoute exact path="/companies">
            <CompanyList />
          </PrivateRoute>

          <PrivateRoute exact path="/jobs">
            <JobList />
          </PrivateRoute>

          <PrivateRoute exact path="/companies/:handle">
            <CompanyDetail />
          </PrivateRoute>

          <PrivateRoute exact path="/memberupdate">
            <ProfileForm />
          </PrivateRoute>

          <PrivateRoute exact path="/djhome">
            <DJHomePage />
          </PrivateRoute>

          <PrivateRoute exact path="/adminhome">
            <AdminHomePage />
          </PrivateRoute>

          <PrivateRoute exact path="/editmembers">
            <EditMembers />
          </PrivateRoute>

          <PrivateRoute exact path="/editmember/:username">
            <EditMember />
          </PrivateRoute>

          <PrivateRoute exact path="/editplaylists">
            <EditPlaylists />
          </PrivateRoute>

          <PrivateRoute exact path="/editshows">
            <EditShows />
          </PrivateRoute>

          <PrivateRoute exact path="/newplaylist">
            <NewPlaylist />
          </PrivateRoute>


          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
