import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../common/Alert";
import HOSApi from "../api/api";
import UserContext from "../auth/UserContext";
import "../shows/ShowCard.css";
import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function EditPlaylistInfo() {
  const { currentUser } = useContext(UserContext);
  const { showid, playlistid } = useParams();
  const [playlistDate, setPlaylistDate] = useState(null);
  const [formData, setFormData] = useState({
    description: ""
  });
  const [formErrors, setFormErrors] = useTimedMessage();

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useTimedMessage();
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "ProfileForm",
      "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  useEffect(function checkForExistingPlaylistOnMount() {
    console.debug("ShowList useEffect getCompaniesOnMount");
    playlistQuery();
  }, []);

  /** Function for determining if a new playlist should exist*/
  async function playlistQuery() {
    
    let playlistQueryResult = await HOSApi.getPlaylistByID(+playlistid);
    setFormData({description: `${playlistQueryResult.description}`});
    setPlaylistDate(playlistQueryResult.date);
  }
  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let playlistData = {
      description: `${formData.description}`,
    };

    let updatedPlaylistInfo;

    try {
      updatedPlaylistInfo = await HOSApi.editDetailsForPlaylist(+playlistid, playlistData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f}));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  
  const d = new Date(playlistDate);
  return (
    <div className="updatePlaylist">
      <div className="showcard">
        <h3>Update Show Info</h3>
      <p>
        <div className="showcardform">
          <form>
              <div className="showcardheaderred">{d.toDateString().slice(4)}</div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
              />
            </div>

            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

            {saveConfirmed
                ?
                <Alert type="success" messages={["Updated successfully."]} />
                : null}

            <button
                className="btn btn-secondary"
                onClick={handleSubmit}
            >
              Submit Changes
            </button>
          </form>
          </div>
          <br />
          <br />
          <Link className="showcardlink" to={`/editshow/${showid}/playlist/${playlistid}`}>Add &amp; Remove Songs</Link>
        </p>
      </div>
    </div>
);
}

export default EditPlaylistInfo;