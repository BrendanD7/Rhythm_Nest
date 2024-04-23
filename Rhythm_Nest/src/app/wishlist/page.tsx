"use client"
import React, { useState, useEffect } from "react";
import MusicItem from "../Components/navigation/Music/album";
import { useAuth } from "../context/AuthContext";
import { Fab, Dialog, DialogTitle, DialogContent, TextField, Button, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from "@mui/material";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { addAlbumWishlist, getUserWishlist } from "../pages/api/collection";

export interface MusicData {
    albumCover: string;
    albumName: string;
    artistName: string;
    releaseDate: string;
    albumFormat: string;
    tracklist: Track[];
}

interface Track{
    name: string;
    duration: string;
}

const Wishlist = () => {
    const [musicList, setMusicList] = useState<MusicData[]>([]);
    const [albumFormat, setAlbumFormat] = useState<string>('');
    const { user } = useAuth();
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [openTracklist, setOpenTracklist] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<MusicData | null>(null);
    const [albumDetails, setAlbumDetails] = useState({
        albumName: "",
        artistName: "",
        albumFormat: "",
    });

    const handleAddAlbum = () => {
        setOpenDialog(true);
    };

    const handleMusicItemClick = (album: MusicData) => {
        setSelectedAlbum(album as MusicData);
        setOpenTracklist(true);
    };

    const handleCloseTracklist = () => {
        setOpenTracklist(false);
        setSelectedAlbum(null);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setAlbumDetails({
            albumName: "",
            artistName: "",
            albumFormat: "",
        });
        setAlbumFormat('');
    };

    const handleFormatChange = (event: SelectChangeEvent<string>) => {
        setAlbumFormat(event.target.value);
    };
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAlbumDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddAlbumSubmit = async () => {
        if(user.uid !== null){
            await addAlbumWishlist(albumDetails.albumName, albumDetails.artistName, albumFormat, user.uid);
            setOpenDialog(false);
            await fetchData();
        };
    }

    async function fetchData() {
        try {
            if(user.uid !== null){
                const data = getUserWishlist(user.uid);
                const arrayData = await data;
                const convertedData: MusicData[] = arrayData.map(album => ({
                    albumCover: album.albumCover,
                    albumName: album.albumName,
                    artistName: album.artistName,
                    releaseDate: album.releaseDate,
                    albumFormat: album.albumFormat,
                    tracklist: album.tracklist
                }));
                setMusicList(convertedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
        

    useEffect(() => {
        if(user.uid === null || user.email === null){
            router.push("/login");
        }
        fetchData();
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <div style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {musicList.length === 0 ? (
                    <h1>No Music In Wishlist</h1>
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
            <Fab
              color="primary"
              aria-label="add"
              style={{ position: "fixed", bottom: "20px", right: "20px" }}
              onClick={handleAddAlbum}
            >
            <AddIcon />
            </Fab>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Add New Album
                    <Button onClick={handleCloseDialog} color="primary" style={{ minWidth: 'unset', padding: '6px' }}>
                        <CloseIcon />
                    </Button>
                </DialogTitle>
                <DialogContent sx={{ paddingTop: '20px', textAlign: 'center' }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="albumName"
                      label="Album Name"
                      type="text"
                      fullWidth
                      name="albumName"
                      value={albumDetails.albumName}
                      onChange={handleInputChange}
                      required={true}
                    />
                    <TextField
                      margin="dense"
                      id="artistName"
                      label="Artist Name"
                      type="text"
                      fullWidth
                      name="artistName"
                      value={albumDetails.artistName}
                      onChange={handleInputChange}
                      required={true}
                    />
                    <FormControl fullWidth sx={{ marginBottom: '10px', marginTop: '10px', textAlign: 'left' }}>
                    <InputLabel id="albumFormat-label">Select Album Format</InputLabel>
                    <Select
                        id="albumFormat"
                        labelId="albumFormat-label"
                        value={albumFormat}
                        onChange={handleFormatChange}
                        label="Select Album Format"
                        required={true}
                    >
                    <MenuItem value = "Vinyl">Vinyl</MenuItem>
                    <MenuItem value = "CD">CD</MenuItem>
                    <MenuItem value = "Cassette">Cassette</MenuItem>
                    <MenuItem value = "Digital">Digital</MenuItem>
                    </Select>
                    </FormControl>
                    <Button onClick={handleAddAlbumSubmit} variant="contained" color="primary">
                        Add
                    </Button>
                </DialogContent>
            </Dialog>
            <Dialog open={openTracklist} onClose={handleCloseTracklist}>
                {selectedAlbum && (
                    <>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {selectedAlbum.albumName} - {selectedAlbum.artistName}
                            <Button onClick={handleCloseTracklist} color="primary" style={{ minWidth: 'unset', padding: '6px' }}>
                                <CloseIcon />
                            </Button>
                        </DialogTitle>
                        <DialogContent>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {selectedAlbum && selectedAlbum.tracklist.map((track, index) => (
                                    <li key={index} style={{ background: '#f0f0f0', borderRadius: '5px', marginBottom: '5px', border: '1px solid #ccc', padding: '10px' }}>
                                        {track.name} - {track.duration}
                                    </li>
                                ))}
                            </ul>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default Wishlist;
