import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

interface TracklistDialogProps {
  open: boolean;
  onClose: () => void;
  selectedAlbum: MusicData | null;
}

interface MusicData {
  albumName: string;
  artistName: string;
  tracklist: Track[];
}

interface Track {
  name: string;
  duration: string;
}

const TracklistDialog: React.FC<TracklistDialogProps> = ({ open, onClose, selectedAlbum }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {selectedAlbum && (
        <>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {selectedAlbum.albumName} - {selectedAlbum.artistName}
            <Button onClick={onClose} color="primary" style={{ minWidth: 'unset', padding: '6px' }}>
              Close
            </Button>
          </DialogTitle>
          <DialogContent>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {selectedAlbum.tracklist.map((track, index) => (
                <li key={index} style={{ background: '#f0f0f0', borderRadius: '5px', marginBottom: '5px', border: '1px solid #ccc', padding: '10px' }}>
                  {track.name} - {track.duration}
                </li>
              ))}
            </ul>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default TracklistDialog;
