"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddStockEntryDialog from "@/app/components/AddStockEntryDialog";
import StockManagementOutward from "@/app/components/StockManagementOutward"; // Replace with the correct outward table component
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getAllOutwardsAction } from "@/redux/stock_management/stock_management.actions";
import { StockManagementOutwardModel } from "@/models/req-model/StockManagementOutwardModel";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// import { useSnackbar } from "notistack";


const Outward = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedOutward, setEditedOutward] = useState<StockManagementOutwardModel | null>(null); // Store outward data for edit
  const [isAddOutwardDialogOpen, setIsAddOutwardDialogOpen] = useState(false); // Control dialog visibility

  // Fetch outwards data from backend
  const fetchData = async () => {
    const params = {
      page: 1,
      take: 10,
      order: "asc",
      orderBy: "transId",
    };
    try {
      await dispatch(getAllOutwardsAction({ commonApiParamModel: params })).unwrap();
    } catch (error) {
      console.error("Error fetching outwards:", error);
    }
  };

  // Refresh outward data after Add/Edit/Delete
  const refreshOutwards = async () => {
    await fetchData();
  };

  // Handle edit button click
  const handleEditOutward = (outward: StockManagementOutwardModel) => {
    setEditedOutward({
      ...outward,
    });
    setIsAddOutwardDialogOpen(true);
  };

  // Handle add button click
  const handleAddOutward = () => {
    setEditedOutward(null); // Reset edited outward
    setIsAddOutwardDialogOpen(true); // Open dialog for adding outward
  };

    // Handle add button click

    const handleAddEntry = () => {
    setEditedOutward(null); // Reset edited outward
    setIsAddOutwardDialogOpen(true); // Open dialog for adding outward
  };

  
  // Close dialog handler
  const handleCloseDialog = () => {
    setIsAddOutwardDialogOpen(false); // Close dialog
    setEditedOutward(null); // Reset edited outward data
  };

  // Fetch outwards on component load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      {/* Header */}
      <Box className="w-full flex items-center justify-between">
        <Typography className="text-2xl font-bold">Stock Management / Outward</Typography>
        <Button
          variant="contained"
          className="bg-primary500 rounded-lg h-10 text-base"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddOutward}
        >
          ADD Entry
        </Button>
      </Box>

      {/* Outward List */}
      <Box className="mt-4">
        <StockManagementOutward onEditOutward={handleEditOutward} />
      </Box>

      {/* Add/Edit Dialog */}
      <AddStockEntryDialog
        stock={false} // Indicates it's for outward
        onOutwardCreated={refreshOutwards} // Refresh outwards after dialog submission
        initialValues={editedOutward || undefined} // Prefill data for edit
        isEditMode={Boolean(editedOutward?.id)} // Indicate edit mode
        open={isAddOutwardDialogOpen} // Dialog visibility control
        onClose={handleCloseDialog} // Close dialog handler
      />
    </Box>
  );
};

export default Outward;
