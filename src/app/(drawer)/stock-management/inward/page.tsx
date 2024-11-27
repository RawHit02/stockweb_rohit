// vendor-management/buyers/page.tsx
"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { Data } from "@/types/types";
import { useSelector, useDispatch } from "react-redux";
import { addBuyer } from "@/redux/slices/buyerSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs
import { AddStockEntryDialog, PrimaryTableExample } from "@/app/components";

const inward = () => {
  // const buyers = useSelector((state: RootState) => state.buyer.buyers);
  // const dispatch = useDispatch<AppDispatch>();

  // Function to handle adding a new buyer with unique ID
  // const addNewBuyer = (buyer: Omit<Data, "id">) => {
  //   const newBuyer = { ...buyer, id: uuidv4() }; // Add unique ID
  //   dispatch(addBuyer(newBuyer));
  // };

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      <Box className="w-full flex items-center justify-between">
        <Typography className="text-2xl font-bold">
          Stock Management / inward
        </Typography>
        <AddStockEntryDialog stock={false} />
      </Box>
      <Box className="mt-4">
        <PrimaryTableExample />
      </Box>
    </Box>
  );
};

export default inward;
