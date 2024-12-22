"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddNewBuyerDialog from "@/app/components/AddNewBuyerDialog";
import VendorManagementBuyers from "@/app/components/VendorManagementBuyers";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useRouter } from "next/navigation";
import { BuyerFormValues } from "@/app/components/AddNewBuyerDialog";
import { VendorManagementBuyerModel } from "@/models/req-model/VendorManagementBuyerModel";
import {
  getAllBuyersAction,
  getAllBuyersNewAction,
} from "@/redux/vendor_management/vendor_management.actions";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const Buyers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [buyers, setBuyers] = useState<VendorManagementBuyerModel[]>([]); // Buyers state
  const [isAddBuyerDialogOpen, setIsAddBuyerDialogOpen] = useState(false);
  const [editedBuyer, setEditedBuyer] = useState<BuyerFormValues | null>(null);

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
  
  // useEffect(() => {
  //   fetchBuyers();
  // }, []);

  // Fetch all buyers from API
  const fetchBuyers = async () => {
    try {
      const data = await getAllBuyersNewAction();
      setBuyers(data);
    } catch (error) {
      console.error("Failed to fetch buyers:", error);
    }
  };

  const refreshBuyers = async () => {
    await fetchData();
  };

  // Handle Buyer Click , Navigate to details page
  const handleBuyerClick = (buyerId: string) => {
    const url = `/vender-management/buyers/buyer-details?id=${buyerId}`;
    console.log("Navigating to:", url);
    router.push(url);
  };

  const normalizeNumberForEdit = (number: string) => {
    return number.startsWith("+91") ? number.slice(3) : number;
  };

  const handleEditBuyer = (buyer: VendorManagementBuyerModel) => {
    setEditedBuyer({
      id: buyer.id,
      name: buyer.name,
      contactNumber: normalizeNumberForEdit(buyer.contactNumber),
      whatsappNumber: normalizeNumberForEdit(buyer.whatsappNumber),
      email: buyer.email,
      address: buyer.address,
      profileImage: null,
    });
    setIsAddBuyerDialogOpen(true);
  };

  // Handle Dialog Close
  const handleCloseDialog = () => {
    setIsAddBuyerDialogOpen(false);
    setEditedBuyer(null);
  };

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      {/* Header */}
      <Box className="w-full flex items-center justify-between mb-4">
        <Typography className="text-2xl font-bold">
          Vendor Management / Buyers
        </Typography>
        <Button
          variant="contained"
          className="bg-primary500 rounded-lg h-10 text-base"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => setIsAddBuyerDialogOpen(true)}
        >
          ADD BUYER
        </Button>
      </Box>

      {/* Buyers List */}
      <Box className="mt-4">
        <VendorManagementBuyers
          buyers={buyers}
          onBuyerClick={handleBuyerClick}
          onEditBuyer={handleEditBuyer}
        />
      </Box>

      {/* Add/Edit Dialog */}
      <AddNewBuyerDialog
        //  onBuyerCreated={handleBuyerCreated}
        onBuyerCreated={refreshBuyers}
        initialValues={editedBuyer || undefined}
        isEditMode={Boolean(editedBuyer?.id)}
        open={isAddBuyerDialogOpen}
        onClose={() => setIsAddBuyerDialogOpen(false)}
      />
    </Box>
  );
};

export default Buyers;
