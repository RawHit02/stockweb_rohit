"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddNewSellerDialog from "@/app/components/AddNewSellerDialog";
import VendorManagementSeller from "@/app/components/VendorManagementSellers";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getAllSellersAction } from "@/redux/vendor_management/vendor_management.actions";
import { SellerFormValues } from "@/app/components/AddNewSellerDialog";
import { VendorManagementSellerModel } from "@/models/req-model/VendorManagementSellerModel";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Sellers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedSeller, setEditedSeller] = useState<SellerFormValues | null>(null); // Store seller data for edit
  const [isAddSellerDialogOpen, setIsAddSellerDialogOpen] = useState(false); // Control dialog visibility

  // Fetch sellers data from backend
  const fetchData = async () => {
    const params = {
      page: 1,
      take: 10,
      order: "asc",
      orderBy: "name",
    };
    try {
      await dispatch(getAllSellersAction({ commonApiParamModel: params })).unwrap();
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  // Refresh seller data after Add/Edit/Delete
  const refreshSellers = async () => {
    await fetchData();
  };

  const normalizeNumberForEdit = (number: string) => {
    return number.startsWith("+91") ? number.slice(3) : number;
  };

  // Handle edit button click
  const handleEditSeller = (seller: VendorManagementSellerModel) => {
    setEditedSeller({
      id: seller.id,
      name: seller.name,
      contactNumber: normalizeNumberForEdit(seller.contactNumber),
      whatsappNumber: normalizeNumberForEdit(seller.whatsappNumber),
      email: seller.email,
      address: seller.address,
      profileImage: null, // Handle profile image as needed
    });
    setIsAddSellerDialogOpen(true);
  };

  // Handle add button click
  const handleAddSeller = () => {
    setEditedSeller(null); // Reset edited seller
    setIsAddSellerDialogOpen(true); // Open dialog for adding seller
  };

  // Close dialog handler
  const handleCloseDialog = () => {
    setIsAddSellerDialogOpen(false); // Close dialog
    setEditedSeller(null); // Reset edited seller data
  };

  // Fetch sellers on component load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      {/* Header */}
      <Box className="w-full flex items-center justify-between">
        <Typography className="text-2xl font-bold">Vendor Management / Sellers</Typography>
        <Button
          variant="contained"
          className="bg-primary500 rounded-lg h-10 text-base"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddSeller}
        >
          ADD SUPPLIER
        </Button>
      </Box>

      {/* Seller List */}
      <Box className="mt-4">
        <VendorManagementSeller onEditSeller={handleEditSeller} />
      </Box>

      {/* Add/Edit Dialog */}
      <AddNewSellerDialog
        onSellerCreated={refreshSellers} // Refresh sellers after dialog submission
        initialValues={editedSeller || undefined} // Prefill data for edit
        isEditMode={Boolean(editedSeller?.id)} // Indicate edit mode
        open={isAddSellerDialogOpen} // Dialog visibility control
        onClose={handleCloseDialog} // Close dialog handler
      />
    </Box>
  );
};

export default Sellers;
