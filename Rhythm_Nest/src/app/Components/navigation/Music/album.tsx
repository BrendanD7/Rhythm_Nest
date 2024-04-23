import React from "react";
import Image from "next/image";
import vinylImage from "./Format/vinyl.png";
import cdImage from "./Format/compact-disc.png";
import digitalImage from "./Format/mp3.png";
import cassetteImage from "./Format/cassette-tape.png";

interface MusicItemProps {
  albumCover: string;
  albumName: string;
  artistName: string;
  releaseDate: string;
  albumFormat: string;
  onClick: () => void;
}

const MusicItem: React.FC<MusicItemProps> = ({
  albumCover,
  albumName,
  artistName,
  releaseDate,
  albumFormat,
  onClick
}) => {
    
  let formatImage;

  switch (albumFormat.toLowerCase()) {
    case "vinyl":
      formatImage = vinylImage;
      break;
    case "cd":
      formatImage = cdImage;
      break;
    case "digital":
      formatImage = digitalImage;
      break;
    case "cassette":
      formatImage = cassetteImage;
      break;
    default:
      formatImage = null;
      break;
  }
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", border: "1px solid white", padding: "1rem", borderRadius: "5px", width: "40rem", height: "auto", backgroundColor:"grey"}}>
      <img src={albumCover} alt={albumName} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
      <div>
        <p style={{ overflowWrap: "normal" }}><strong>Album:</strong> {albumName}</p>
        <p style={{ overflowWrap: "normal" }}><strong>Artist:</strong> {artistName}</p>
        <p style={{ overflowWrap: "normal" }}><strong>Release Date:</strong> {releaseDate}</p>
      </div>
      <div style={{ marginLeft: "auto", paddingLeft: "30px" }}>
        {formatImage && <Image src={formatImage} alt={albumFormat} style={{ minWidth: "60px", minHeight: "60px", maxWidth: "60px", maxHeight: "60px"}} />}
        {!formatImage && <p><strong>Format:</strong> {albumFormat}</p>}
      </div>
    </div>
  );
};

export default MusicItem;
