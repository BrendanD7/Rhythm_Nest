import React from "react";
import MusicItem from "./album";
import { MusicData } from "../../../collection/page";

interface MusicListProps {
  musicList: MusicData[];
  handleMusicItemClick: (album: MusicData) => void;
}

const MusicList: React.FC<MusicListProps> = ({
  musicList,
  handleMusicItemClick,
}) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {musicList.length === 0 ? (
        <h1>No Music In Collection</h1>
      ) : (
        musicList.map((item, index) => (
          <MusicItem
            key={index}
            albumCover={item.albumCover}
            albumName={item.albumName}
            artistName={item.artistName}
            releaseDate={item.releaseDate}
            albumFormat={item.albumFormat}
            onClick={() => handleMusicItemClick(item)}
          />
        ))
      )}
    </div>
  );
};

export default MusicList;
