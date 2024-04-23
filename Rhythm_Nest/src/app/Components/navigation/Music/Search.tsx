import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onClose, searchQuery, onSearchInputChange, onSearch }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Search</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="search"
          label="Search"
          fullWidth
          value={searchQuery}
          onChange={onSearchInputChange}    
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: "space-between" }}>
        <Button onClick={onClose} variant="contained" color="error">Cancel</Button>
        <Button onClick={onSearch} variant="contained" color="primary">Search</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchDialog;
