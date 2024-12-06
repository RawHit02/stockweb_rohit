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

const Outward = () => {
  const dispatch = useDispatch<AppDispatch>();

  // State for managing dialog
  const [isEditMode, setIsEditMode] = useState(false);
  const [dialogInitialValues, setDialogInitialValues] = useState<StockManagementOutwardModel | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
  const handleEditOutward = (row: StockManagementOutwardModel) => {
    setIsEditMode(true); // Enable edit mode
    setDialogInitialValues(row); // Prefill dialog with selected row data
    setDialogOpen(true); // Open the dialog
  };

  // Handle add button click
  const handleAddOutward = () => {
    setIsEditMode(false); // Disable edit mode
    setDialogInitialValues(null); // Clear dialog initial values
    setDialogOpen(true); // Open the dialog
  };

  // Close dialog handler
  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
    setDialogInitialValues(null); // Clear dialog initial values
  };

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      {/* Header */}
      <Box className="w-full flex items-center justify-between">
        <Typography className="text-2xl font-bold">
          Stock Management / Outward
        </Typography>
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
        isEditMode={isEditMode}
        initialValues={
          dialogInitialValues || ({} as StockManagementOutwardModel)
        }
        open={dialogOpen}
        onClose={handleCloseDialog}
        onOutwardCreated={refreshOutwards} // Refresh outwards after dialog submission
      />
    </Box>
  );
};

export default Outward;
