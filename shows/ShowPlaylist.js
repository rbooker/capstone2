import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HOSApi from "../api/api";
import ShowCard from "./ShowCard";
import LoadingSpinner from "../common/LoadingSpinner";
import "./ShowList.css";
import "./ShowCard.css";
import "./ShowPlaylist.css";

function ShowPlaylist() {
    console.debug("ShowProfile");
    
    const { showid, playlistid } = useParams();

    
    const [playlistdata, setPlaylistData] = useState(null);
    const [showdata, setShowData] = useState(null);
  
    useEffect(function getPlaylistDataOnMount() {
      console.debug("ShowProfile useEffect getShowDataOnMount");
      playlistQuery();
    }, []);

    useEffect(function getShowDataOnMount() {
        console.debug("ShowProfile useEffect getShowDataOnMount");
        showQuery();
      }, []);
  
    /** Triggered by search form submit; reloads companies. */
    async function playlistQuery() {
      let playlistQueryResult = await HOSApi.getPlaylistByID(+playlistid);
      setPlaylistData(playlistQueryResult.songs);
    }

    async function showQuery() {
        let showQueryResult = await HOSApi.getShowByID(+showid);
        setShowData(showQueryResult);
    }
    console.log(playlistdata);
    
    if (!playlistdata || !showdata) return <LoadingSpinner />;
    
    let playlistTable = playlistdata.map(t => (<tr><td>{t.artist}</td><td>{t.title}</td><td>{t.album}</td></tr>));
    
    let playlistInfo = showdata.playlists.filter(p => p.id === +playlistid)[0];
    const d = new Date(playlistInfo.date);

    return (
        <div className="showcard">
        <h3>Playlist for {showdata.showName}</h3>
        
        <p>
          <div className="showcardheaderred">{d.toDateString().slice(4)}</div>
          <table><tr><th>Artist</th><th>Title</th><th>Album</th></tr>{playlistTable}</table>
          <br/>
          <div className="showcardheaderred">Description</div>
          {playlistInfo.description}
        </p>
        </div>
      );
}

export default ShowPlaylist;