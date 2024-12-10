"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Box,
  DialogActions,
  IconButton,
} from "@mui/material";
import { CloseOutlinedIcon, CheckCircleIcon } from "../assets";

interface AddNewItemProps {
  onAddItem: (newItem: string) => void; // Add the onAddItem callback function
}

const AddNewItem: React.FC<AddNewItemProps> = (props) => {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = () => {
    setIsAddItemDialogOpen(true); // Open dialog for adding inward
  };

  // Close dialog handler
  const handleCloseAddNewDialog = () => {
    setIsAddItemDialogOpen(false); // Close dialog
  };

  // Add new item handler
  const handleAddNewItem = () => {
    if (newItemName.trim() !== "") {
      props.onAddItem(newItemName.trim()); // Call the onAddItem callback
      setNewItemName(""); // Clear the input
      handleCloseAddNewDialog(); // Close the dialog
    }
  };

  return (
    <>
      <Button
        variant="text"
        className="text-primary500 text-sm font-normal"
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          handleAddItem();
        }}
      >
        +Add New
      </Button>
      <Dialog
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={isAddItemDialogOpen}
        maxWidth="sm"
        PaperProps={{
          onClick: (e: any) => {
            e.stopPropagation();
          },
        }}
        onClose={(e: any, reason) => {
          e.preventDefault();
          e.stopPropagation();
          if (reason !== "backdropClick") {
            handleCloseAddNewDialog();
          }
        }}
      >
        <DialogTitle
          component="div"
          className="flex items-start justify-between px-9 pt-9 pb-4"
        >
          <Box>
            <Typography className="text-2xl font-bold">Add New Item</Typography>
          </Box>
          <IconButton
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              handleCloseAddNewDialog();
            }}
            className="p-0 text-[#1C1B1F]"
          >
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContentText component="div" className="px-9">
          <Box className="flex flex-col gap-2">
            <Typography className=" text-primary text-sm font-normal mb-1">
              Add New Item
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Enter Here"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
          </Box>
        </DialogContentText>
        <DialogActions className="mb-[36px] px-9 pt-5">
          <Button
            variant="outlined"
            size="large"
            startIcon={<CloseOutlinedIcon />}
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              handleCloseAddNewDialog();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CheckCircleIcon className="!text-[20px]" />}
            onClick={handleAddNewItem} // Call the add new item handler
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewItem;
