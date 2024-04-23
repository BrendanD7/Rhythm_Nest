import React, {useState} from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel, DialogActions } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AddMusicDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  albumDetails: {
    albumName: string;
    artistName: string;
    albumFormat: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormatChange: (event: SelectChangeEvent<string>) => void;
}

const AddMusicDialog: React.FC<AddMusicDialogProps> = ({ open, onClose, onSubmit, albumDetails, onInputChange, onFormatChange }) => {
  const [formValid, setFormValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e);
    checkFormValidity();
  };

  const handleFormatChange = (event: SelectChangeEvent<string>) => {
    onFormatChange(event);
    albumDetails.albumFormat = event.target.value;
    checkFormValidity();
  };

  const checkFormValidity = () => {
    const { albumName, artistName, albumFormat } = albumDetails;
    if (albumName.trim() !== "" && artistName.trim() !== "" && albumFormat.trim() !== "") {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = () => {
    if (formValid) {
      onSubmit();
    }
  };

  const handleClose = () => {
    setFormValid(false);
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Add New Album
        <Button onClick={onClose} color="primary" style={{ minWidth: 'unset', padding: '6px' }}>
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
          InputLabelProps={{ required: false }}
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
          InputLabelProps={{ required: false }}
          required={true}
        />
        <FormControl fullWidth sx={{ marginBottom: '10px', marginTop: '10px', textAlign: 'left' }}>
          <InputLabel id="albumFormat-label">Select Album Format</InputLabel>
          <Select
            id="albumFormat"
            labelId="albumFormat-label"
            value={albumDetails.albumFormat}
            onChange={handleFormatChange}
            label="Select Album Format"
            required={true}
          >
            <MenuItem value="Vinyl">Vinyl</MenuItem>
            <MenuItem value="CD">CD</MenuItem>
            <MenuItem value="Cassette">Cassette</MenuItem>
            <MenuItem value="Digital">Digital</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!formValid}>
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddMusicDialog;
