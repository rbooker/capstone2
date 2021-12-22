import React, { useState, useEffect, useContext } from "react";
import HOSApi from "../api/api";
import ShowCard from "./ShowCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import "./ShowList.css";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function ShowList() {
  console.debug("CompanyList");

  const dateObj = new Date;
  

  const [shows, setShows] = useState(null);
  

  useEffect(function getCompaniesOnMount() {
    console.debug("ShowList useEffect getCompaniesOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search() {
    let showsForDay = await HOSApi.getShowsForDay(dateObj.getDay());
    setShows(showsForDay);
  }

  

  if (!shows) return <LoadingSpinner />;

  console.log(shows);
  return (
    <><div className="showcardheader">Today's Programming</div>
      <div>
        {shows.length
            ? (
              <div>
            {shows.map(s => (
              <ShowCard
                key={s.showName}
                showID={s.id}
                showName={s.showName}
                djName={s.djName}
                showTime={s.showTime}
                description={s.description}
                imgURL={s.imgURL}
                 />
            ))}
          </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div></>
  );
}

export default ShowList;
