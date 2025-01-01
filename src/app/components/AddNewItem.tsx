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
import {
  addPurity,
  addForm,
  addColor,
  addType,
  fetchPurities,
  fetchForms,
  fetchColors,
  fetchOrnamentTypes,
} from "@/redux/stock_management/stock_management.actions";
import { useAppDispatch } from "@/redux/store";

interface AddNewItemProps {
  stockTypeId: string;
  category: "purity" | "form" | "color" | "type";
  onAddItem: (newItem: { id: string; name: string }) => void;
}

const AddNewItem: React.FC<AddNewItemProps> = ({
  stockTypeId,
  category,
  onAddItem,
}) => {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsDialogOpen(false);
    setNewItemName("");
  };

  const handleAddNewItem = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!newItemName.trim()) return;

    setIsLoading(true);
    try {
      let response;

      if (category === "purity") {
        response = await dispatch(
          addPurity({
            ornament: stockTypeId,
            ornamentPurity: newItemName.trim(),
          })
        ).unwrap();
      } else if (category === "form") {
        response = await dispatch(
          addForm({
            ornament: stockTypeId,
            ornamentForm: newItemName.trim(),
          })
        ).unwrap();
      } else if (category === "color") {
        response = await dispatch(
          addColor({
            ornament: stockTypeId,
            ornamentColor: newItemName.trim(),
          })
        ).unwrap();
      } else if (category === "type") {
        response = await dispatch(
          addType({
            ornament: stockTypeId,
            ornamentType: newItemName.trim(),
          })
        ).unwrap();
      } else {
        throw new Error("Invalid category provided to AddNewItem.");
      }

      if (response?.data) {
        onAddItem({
          id: response.data,
          name: newItemName.trim(),
        });

        // Fetch updated list of items for the category
        switch (category) {
          case "purity":
            await dispatch(fetchPurities());
            break;
          case "form":
            await dispatch(fetchForms());
            break;
          case "color":
            await dispatch(fetchColors());
            break;
          case "type":
            await dispatch(fetchOrnamentTypes());
            break;
        }
      }

      handleCloseDialog();
    } catch (error) {
      console.error(`Failed to add new ${category}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="text"
        className="text-primary500 text-sm font-normal"
        onClick={handleOpenDialog}
      >
        +Add New
      </Button>
      <Dialog
        fullWidth
        open={isDialogOpen}
        maxWidth="sm"
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          handleCloseDialog();
        }}
        PaperProps={{
          onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
        }}
      >
        <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-4">
          <Box>
            <Typography className="text-2xl font-bold">Add New Item</Typography>
          </Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleCloseDialog(e);
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContentText component="div" className="px-9">
          <Box className="flex flex-col gap-2">
            <Typography className="text-primary text-sm font-normal mb-1">
              Add New {category.charAt(0).toUpperCase() + category.slice(1)}
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder={`Enter New ${category}`}
              value={newItemName !== undefined ? newItemName : ""} // Avoid undefined
              onChange={(e) => setNewItemName(e.target.value)}
              disabled={isLoading}
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        </DialogContentText>
        <DialogActions className="mb-[36px] px-9 pt-5">
          <Button
            variant="outlined"
            size="large"
            startIcon={<CloseOutlinedIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleCloseDialog(e);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CheckCircleIcon />}
            onClick={handleAddNewItem}
            disabled={isLoading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewItem;
