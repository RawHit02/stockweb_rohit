"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddNewBuyerDialog from "@/app/components/AddNewBuyerDialog";
import VendorManagementBuyers from "@/app/components/VendorManagementBuyers";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getAllBuyersAction } from "@/redux/vendor_management/vendor_management.actions";
import { BuyerFormValues } from "@/app/components/AddNewBuyerDialog";
import { VendorManagementBuyerModel } from "@/models/req-model/VendorManagementBuyerModel";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Buyers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedBuyer, setEditedBuyer] = useState<BuyerFormValues | null>(null); // Store buyer data for edit
  const [isAddBuyerDialogOpen, setIsAddBuyerDialogOpen] = useState(false); // Control dialog visibility

  // Fetch buyers data from backend
  const fetchData = async () => {
    const params = {
      page: 1,
      take: 10,
      order: "asc",
      orderBy: "name",
    };
    try {
      await dispatch(
        getAllBuyersAction({ commonApiParamModel: params })
      ).unwrap();
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  // Refresh buyer data after Add/Edit/Delete
  const refreshBuyers = async () => {
    await fetchData();
  };

  const normalizeNumberForEdit = (number: string) => {
    return number.startsWith("+91") ? number.slice(3) : number;
  };

  // Handle edit button click
  const handleEditBuyer = (buyer: VendorManagementBuyerModel) => {
    setEditedBuyer({
      id: buyer.id,
      name: buyer.name,
      contactNumber: normalizeNumberForEdit(buyer.contactNumber),
      whatsappNumber: normalizeNumberForEdit(buyer.whatsappNumber),
      email: buyer.email,
      address: buyer.address,
      profileImage: null, // Handle profile image as needed
    });
    setIsAddBuyerDialogOpen(true);
  };

  // Handle add button click
  const handleAddBuyer = () => {
    setEditedBuyer(null); // Reset edited buyer
    setIsAddBuyerDialogOpen(true); // Open dialog for adding buyer
  };

  // Close dialog handler
  const handleCloseDialog = () => {
    setIsAddBuyerDialogOpen(false); // Close dialog
    setEditedBuyer(null); // Reset edited buyer data
  };

  // Fetch buyers on component load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      {/* Header */}
      <Box className="w-full flex items-center justify-between">
        <Typography className="text-2xl font-bold">
          Vendor Management / Buyers
        </Typography>
        <Button
          variant="contained"
          className="bg-primary500 rounded-lg h-10 text-base"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddBuyer}
        >
          ADD BUYER
        </Button>
      </Box>

      {/* Buyer List */}
      <Box className="mt-4">
        <VendorManagementBuyers onEditBuyer={handleEditBuyer} />
      </Box>

      {/* Add/Edit Dialog */}
      <AddNewBuyerDialog
        onBuyerCreated={refreshBuyers} // Refresh buyers after dialog submission
        initialValues={editedBuyer || undefined} // Prefill data for edit
        isEditMode={Boolean(editedBuyer?.id)} // Indicate edit mode
        open={isAddBuyerDialogOpen} // Dialog visibility control
        onClose={handleCloseDialog} // Close dialog handler
      />
    </Box>
  );
};

export default Buyers;
