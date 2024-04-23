import React from "react";
import { Dialog, DialogTitle, DialogContent, Button, Box } from "@mui/material";
import { deleteItem, transferToCatalogue } from "../../../pages/api/collection";

interface TracklistDialogProps {
  open: boolean;
  onClose: () => void;
  selectedAlbum: MusicData | null;
  userUid: string | null;
  location: string;
  onDeleteSuccess: () => void;
}

interface MusicData {
  albumName: string;
  artistName: string;
  albumFormat: string;
  tracklist: Track[];
}

interface Track {
  name: string;
  duration: string;
}

const TracklistDialog: React.FC<TracklistDialogProps> = ({
  open,
  onClose,
  selectedAlbum,
  userUid,
  location,
  onDeleteSuccess,
}) => {
  const handleRemove = async () => {
    if (selectedAlbum !== null && userUid !== null) {
      await deleteItem(
        selectedAlbum.albumName,
        selectedAlbum.artistName,
        selectedAlbum.albumFormat,
        userUid,
        location
      );
      onDeleteSuccess();
    }
    onClose();
  };

  const handleTransferToCollection = async () => {
    if (selectedAlbum !== null && userUid !== null) {
      await transferToCatalogue(
        selectedAlbum.albumName,
        selectedAlbum.artistName,
        selectedAlbum.albumFormat,
        userUid
      );
      onDeleteSuccess();
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      {selectedAlbum && (
        <>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {selectedAlbum.albumName} - {selectedAlbum.artistName}
            <Button
              onClick={onClose}
              color="primary"
              variant="contained"
              style={{ minWidth: "unset", padding: "6px", marginLeft: "10px" }}
            >
              Close
            </Button>
          </DialogTitle>
          <DialogContent>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {selectedAlbum.tracklist.map((track, index) => (
                <li
                  key={index}
                  style={{
                    background: "#f0f0f0",
                    borderRadius: "5px",
                    marginBottom: "5px",
                    border: "1px solid #ccc",
                    padding: "10px",
                  }}
                >
                  {track.name} - {track.duration}
                </li>
              ))}
            </ul>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="error"
                onClick={handleRemove}
                style={{ marginTop: "10px", marginRight: "10px" }}
              >
                Delete
              </Button>
              {location === "Wishlist" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTransferToCollection}
                  style={{ marginTop: "10px" }}
                >
                  Transfer to Collection
                </Button>
              )}
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default TracklistDialog;
