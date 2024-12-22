"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { PrimaryTableExample } from "@/app/components";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useRouter } from "next/navigation";
import AttendanceTableRecords from "@/app/components/AttendanceTableRecords";

const RolesPermission = () => {
  const router = useRouter()
  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      <Box className="w-full flex items-center justify-between">
        <Box>
          <Box>
            <Typography className="text-2xl font-semibold">
              Role & Permission
            </Typography>
          </Box>
          <Box>
            <Typography className="text-xs font-normal">
              Add, Edit and delete users
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            className="bg-primary500 rounded-lg h-10 text-base"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() => router.push('/admin-management/roles-permission/all-permission')}
          >
            Add roles & permission
          </Button>
        </Box>
      </Box>
      <Box className="mt-4">
        <AttendanceTableRecords onEditRecord={() => {}} />
      </Box>
    </Box>
  );
};

export default RolesPermission;
