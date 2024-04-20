import React from "react";
import MusicItem from "../Components/navigation/Music/album";

const Collection = () =>{
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem"}}>
            <MusicItem 
            albumCover="https://upload.wikimedia.org/wikipedia/en/b/b8/CureDisintegration.jpg"
            albumName="Disintegration"
            artistName="The Cure"
            albumGenre="Gothic Rock"
            albumFormat="Vinyl"
            />
        </div>
    )
};

export default Collection;