"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddStockEntryDialog from "@/app/components/AddStockEntryDialog";
import StockManagementInward from "@/app/components/StockManagementInward"; // Replace with the correct inward table component
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getAllInwardsAction } from "@/redux/stock_management/stock_management.actions";
import { StockManagementInwardModel } from "@/models/req-model/StockManagementInwardModel";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useSnackbar } from "notistack";

const Inward = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedInward, setEditedInward] =
    useState<StockManagementInwardModel | null>(null); // Store inward data for edit
  const [isAddInwardDialogOpen, setIsAddInwardDialogOpen] = useState(false); // Control dialog visibility

  // Fetch inwards data from backend
  const fetchData = async () => {
    const params = {
      page: 1,
      take: 10,
      order: "asc",
      orderBy: "transId",
    };
    try {
      await dispatch(
        getAllInwardsAction({ commonApiParamModel: params })
      ).unwrap();
    } catch (error) {
      console.error("Error fetching inwards:", error);
    }
  };

  // Refresh inward data after Add/Edit/Delete
  const refreshInwards = async () => {
    await fetchData();
  };

  // Handle edit button click
  const handleEditInward = (inward: StockManagementInwardModel) => {
    setEditedInward({
      ...inward,
    });
    setIsAddInwardDialogOpen(true);
  };

  // Handle add button click
  const handleAddInward = () => {
    setEditedInward(null); // Reset edited inward
    setIsAddInwardDialogOpen(true); // Open dialog for adding inward
  };

  // Close dialog handler
  const handleCloseDialog = () => {
    setIsAddInwardDialogOpen(false); // Close dialog
    setEditedInward(null); // Reset edited inward data
  };

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      {/* Header */}
      <Box className="w-full flex items-center justify-between">
        <Typography className="text-2xl font-bold">
          Stock Management / Inward
        </Typography>
        <Button
          variant="contained"
          className="bg-primary500 rounded-lg h-10 text-base"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddInward} // Open Add Stock dialog
        >
          ADD STOCK
        </Button>
      </Box>

      {/* Inward List */}
      <Box className="mt-4">
        <StockManagementInward onEditInward={handleEditInward} />
      </Box>

      {/* Add/Edit Dialog */}
      <AddStockEntryDialog
        stock={true} // Indicates it's for inward
        onInwardCreated={refreshInwards} // Refresh inwards after dialog submission
        initialValues={editedInward || ({} as StockManagementInwardModel)}
        isEditMode={Boolean(editedInward?.id)}
        open={isAddInwardDialogOpen}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default Inward;
