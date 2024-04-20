"use client"
import React, { useState } from "react";
import MusicItem from "../Components/navigation/Music/album";

const Collection = () => {
    const [musicList, setMusicList] = useState([
        {
            albumCover: "https://upload.wikimedia.org/wikipedia/en/7/76/Tribulation_The_Children_of_the_Night.jpg",
            albumName: "The Children of the Night",
            artistName: "Tribulation",
            albumGenre: "Black Metal",
            albumFormat: "Cassette"
        },
        {
          albumCover: "https://upload.wikimedia.org/wikipedia/en/1/12/Black_Midi_-_Hellfire.png",
          albumName: "Hellfire",
          artistName: "Black Midi",
          albumGenre: "Post Punk",
          albumFormat: "Digital",
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
