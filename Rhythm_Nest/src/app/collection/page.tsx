"use client"
import React, { useState } from "react";
import MusicItem from "../Components/navigation/Music/album";

const Collection = () => {
    const [musicList, setMusicList] = useState([
        {
            albumCover: "https://upload.wikimedia.org/wikipedia/en/b/b8/CureDisintegration.jpg",
            albumName: "Disintegration",
            artistName: "The Cure",
            albumGenre: "Gothic Rock",
            albumFormat: "Vinyl"
        },
        {
          albumCover: "https://upload.wikimedia.org/wikipedia/en/0/07/The_Cure_-_Pornography.jpg",
          albumName: "Pornography",
          artistName: "The Cure",
          albumGenre: "Gothic Rock",
          albumFormat: "CD",
        },
      ]);
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {musicList.map((item, index) => (
          <MusicItem
            key={index}
            albumCover={item.albumCover}
            albumName={item.albumName}
            artistName={item.artistName}
            albumGenre={item.albumGenre}
            albumFormat={item.albumFormat}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
