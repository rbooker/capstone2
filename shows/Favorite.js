import React, { useState, useEffect, useContext} from "react";
import HOSApi from "../api/api";
import UserContext from "../auth/UserContext";
import "./Favorite.css";

function Favorite({ showID, favoriteIDs }) {
  
    const { currentUser } = useContext(UserContext);
    const [favorite, setFavorite] = useState(null);
    let favoritesAddResult;
    let favoritesDeleteResult;

    useEffect(function getFavoriteOnMount() {
        console.debug("ShowList useEffect getCompaniesOnMount");
        favoriteQuery();
      }, []);
      
      
      async function favoriteQuery() {
        const userFavoritesQuery = await HOSApi.getFavoritesByUserID(currentUser.id);
        let userFavoritesIDs;

        if (userFavoritesQuery.length > 0)
            userFavoritesIDs = userFavoritesQuery.map(f => f.showID);
        else
            userFavoritesIDs = [];

        setFavorite(userFavoritesIDs.includes(showID));
      }
    
    async function favoriteToggle() {
        
        const favoriteData = {"memberID": currentUser.id, "showID": showID}

        if(favorite){
            setFavorite(f => !f);
            favoritesDeleteResult = await HOSApi.removeFavorite(favoriteData);
            
            console.log("deleted the favorite");
        }
        else{
            favoritesAddResult = await HOSApi.addFavorite(favoriteData);
            setFavorite(f => !f);
            console.log("added a favorite");
        }
    }
  
    return (
        <div className="Favorite">
            {favorite ? <i onClick={favoriteToggle} className="bi-heart-fill" ></i>
                      : <i onClick={favoriteToggle} className="bi-heart"></i>}
        </div>
    );
  }
  //style={{"color": "red", "fontSize": "1em"}}
  export default Favorite;