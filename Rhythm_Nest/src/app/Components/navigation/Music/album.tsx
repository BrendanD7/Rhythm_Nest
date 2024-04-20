import React from "react";

interface MusicItemProps {
  albumCover: string;
  albumName: string;
  artistName: string;
  albumGenre: string;
  albumFormat: string;
}

const MusicItem: React.FC<MusicItemProps> = ({
  albumCover,
  albumName,
  artistName,
  albumGenre,
  albumFormat
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", padding: "1rem", borderRadius: "5px", maxWidth: "50%"}}>
      <img src={albumCover} alt={albumName} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
      <div>
        <p><strong>Album:</strong> {albumName}</p>
        <p><strong>Artist:</strong> {artistName}</p>
        <p><strong>Genre:</strong> {albumGenre}</p>
        <p><strong>Format:</strong> {albumFormat}</p>
      </div>
    </div>
  );
};

export default MusicItem;
