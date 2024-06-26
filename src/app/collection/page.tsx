"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Fab, Typography, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { addAlbumCollection, getUserCollection } from "../pages/api/collection";
import SearchIcon from "@mui/icons-material/Search";
import MusicList from "../Components/navigation/Music/MusicList";
import AddMusicDialog from "../Components/navigation/Music/AddMusic";
import SearchDialog from "../Components/navigation/Music/Search";
import TracklistDialog from "../Components/navigation/Music/Tracklist";

export interface MusicData {
  albumCover: string;
  albumName: string;
  artistName: string;
  releaseDate: string;
  albumFormat: string;
  tracklist: Track[];
}

interface Track {
  name: string;
  duration: string;
}

const Collection = () => {
  /** Hooks */
  const [musicList, setMusicList] = useState<MusicData[]>([]);
  const [albumFormat, setAlbumFormat] = useState<string>("");
  const { user } = useAuth();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [openTracklist, setOpenTracklist] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<MusicData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [albumDetails, setAlbumDetails] = useState({
    albumName: "",
    artistName: "",
    albumFormat: "",
  });

  /** Add FAB Pressed */
  const handleAddAlbum = () => {
    setOpenDialog(true);
  };

  /** Music Item Clicked */
  const handleMusicItemClick = (album: MusicData) => {
    setSelectedAlbum(album as MusicData);
    setOpenTracklist(true);
  };

  /** Close Music Item */
  const handleCloseTracklist = () => {
    setOpenTracklist(false);
    setSelectedAlbum(null);
  };

  /** Close add FAB dialog */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAlbumDetails({
      albumName: "",
      artistName: "",
      albumFormat: "",
    });
    setAlbumFormat("");
  };

  /** Handle selection in combobox for album format */
  const handleFormatChange = (event: SelectChangeEvent<string>) => {
    const selectedFormat = event.target.value;
    setAlbumFormat(selectedFormat);
    setAlbumDetails((prevAlbumDetails) => ({
      ...prevAlbumDetails,
      albumFormat: selectedFormat,
    }));
  };

  /** Handle chambe in input for name/artist */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAlbumDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /** When the user has submitted the album, write it to the database */
  const handleAddAlbumSubmit = async () => {
    if (user.uid !== null) {
      await addAlbumCollection(
        albumDetails.albumName,
        albumDetails.artistName,
        albumFormat,
        user.uid
      );
      setOpenDialog(false);
      await fetchData();
    }
  };

  /** Fetch collection from database */
  async function fetchData() {
    try {
      if (user.uid !== null) {
        const data = getUserCollection(user.uid);
        const arrayData = await data;
        const convertedData: MusicData[] = arrayData.map((album) => ({
          albumCover: album.albumCover,
          albumName: album.albumName,
          artistName: album.artistName,
          releaseDate: album.releaseDate,
          albumFormat: album.albumFormat,
          tracklist: album.tracklist,
        }));
        setMusicList(convertedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  /** Search FAB Input changed */
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  /** Search Submitted */
  const handleSearch = () => {
    filterMusic();
    setOpenSearchDialog(false);
  };

  /** Search FAB Button clicked */
  const handleSearchFabClick = () => {
    setOpenSearchDialog(true);
  };

  /** Search FAB Closed */
  const handleSearchFabClose = () => {
    setOpenSearchDialog(false);
  };

  /** If the user is not logged in, go to login page */
  useEffect(() => {
    if (user.uid === null || user.email === null) {
      router.push("/login");
    }
    fetchData();
  }, []);

  /** Filter for searching within the music list */
  var filteredMusicList = musicList.filter(
    (item) =>
      item.albumName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artistName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filterMusic = () => {
    filteredMusicList = musicList.filter(
      (item) =>
        item.albumName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artistName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
    >
      <div>
        <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
          Collection
        </Typography>
        <MusicList
          musicList={filteredMusicList}
          handleMusicItemClick={handleMusicItemClick}
        />
      </div>
      <Fab
        color="primary"
        aria-label="search"
        onClick={handleSearchFabClick}
        style={{ position: "absolute", bottom: "20px", left: "20px" }}
      >
        <SearchIcon />
      </Fab>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={handleAddAlbum}
      >
        <AddIcon />
      </Fab>

      <AddMusicDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleAddAlbumSubmit}
        albumDetails={albumDetails}
        onInputChange={handleInputChange}
        onFormatChange={handleFormatChange}
      />
      <TracklistDialog
        open={openTracklist}
        onClose={handleCloseTracklist}
        selectedAlbum={selectedAlbum}
        userUid={user.uid}
        location={"Collection"}
        onDeleteSuccess={fetchData}
      />
      <SearchDialog
        open={openSearchDialog}
        onClose={handleSearchFabClose}
        searchQuery={searchQuery}
        onSearchInputChange={handleSearchInputChange}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default Collection;
