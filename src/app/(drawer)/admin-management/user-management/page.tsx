"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { AddUserDialog, UserManagement } from "@/app/components";

const ManageEmployee = () => {
  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      <Box className="w-full flex items-center justify-between">
        <Box>
          <Box>
            <Typography className="text-2xl font-bold">
              User Management
            </Typography>
          </Box>
          <Box>
            <Typography className="text-xs font-normal">
              Add, Edit and delete users
            </Typography>
          </Box>
        </Box>
        <Box>
          <AddUserDialog />
        </Box>
      </Box>
      <Box className="mt-4">
        <UserManagement />
      </Box>
    </Box>
  );
};

export default ManageEmployee;
