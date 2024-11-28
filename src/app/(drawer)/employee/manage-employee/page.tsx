"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { AddEmployeeDialog, PrimaryTableExample } from "@/app/components";

const ManageEmployee = () => {
  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      <Box className="w-full flex items-center justify-between">
        <Typography className="text-2xl font-bold">Manage Employees</Typography>
        <Box>
          <AddEmployeeDialog />
        </Box>
      </Box>
      <Box className="mt-4">
        <PrimaryTableExample />
      </Box>
    </Box>
  );
};

export default ManageEmployee;
