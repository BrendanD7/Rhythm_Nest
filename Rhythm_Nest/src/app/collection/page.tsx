"use client"
import React, { useState, useEffect } from "react";
import MusicItem from "../Components/navigation/Music/album";
import { useAuth } from "../context/AuthContext";
import { Fab, Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface MusicData {
    albumCover: string;
    albumName: string;
    artistName: string;
    albumGenre: string;
    albumFormat: string;
}

const Collection = () => {
    const [musicList, setMusicList] = useState<MusicData[]>([]);
    const { user } = useAuth();
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [albumDetails, setAlbumDetails] = useState({
        albumName: "",
        artistName: "",
        albumFormat: "",
    });

    const handleAddAlbum = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAlbumDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddAlbumSubmit = () => {
        // Add logic to submit album details to backend or perform any other action
        console.log("Album details:", albumDetails);
        setOpenDialog(false);
    };

    useEffect(() => {
        if(user.uid === null || user.email === null){
            router.push("/login");
        }
        async function fetchData() {
            try {
                const response = await fetch("/api/collection");
                const data = await response.json();
                setMusicList(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [musicList]);

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <div style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {musicList.length === 0 ? (
                    <h1>No Music In Collection</h1>
                ) : (
                    musicList.map((item, index) => (
                        <MusicItem
                          key={index}
                          albumCover={item.albumCover}
                          albumName={item.albumName}
                          artistName={item.artistName}
                          albumGenre={item.albumGenre}
                          albumFormat={item.albumFormat}
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
                    />
                    <TextField
                      margin="dense"
                      id="albumFormat"
                      label="Album Format"
                      type="text"
                      fullWidth
                      name="albumFormat"
                      value={albumDetails.albumFormat}
                      onChange={handleInputChange}
                    />
                    <Button onClick={handleAddAlbumSubmit} variant="contained" color="primary">
                        Add
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Collection;
