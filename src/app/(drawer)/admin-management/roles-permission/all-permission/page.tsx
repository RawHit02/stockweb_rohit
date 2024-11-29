"use client";

import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AllPermissionTable } from "@/app/components";
import Image from "next/image";
import { KeyboardBackspaceIcon } from "@/app/assets";
import { useRouter } from "next/navigation";

const AllPermission = () => {
  const router = useRouter();
  return (
    <>
      <Box className=" rounded-[12px] border border-[#E8EBED] bg-[#FFFFFF] p-6 h-[calc(100vh-116px)] overflow-auto">
        <Box className="flex flex-col gap-4">
          <Box className="flex flex-row justify-between">
            <Box className="flex flex-col gap-[4px]">
              <Typography className="text-2xl font-semibold">All Permissions</Typography>
              <Box className="flex gap-2 items-center">
                <Box className="cursor-pointer" onClick={() => router.back()}>
                  <KeyboardBackspaceIcon className="text-[#414855]" />
                </Box>
                <Box>
                  <Typography className="text-xs font-normal flex flex-row self-end">
                    Add & Update role and permission
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CheckCircleIcon className="!text-[20px]" />}
              >
                Save
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography className="text-2xl font-semibold">Role</Typography>
          </Box>
          <Box className="flex flex-row gap-[10px] w-full">
            <Box className="flex flex-col gap-[4px] w-1/4">
              <Box className="p-[2px] flex flex-row justify-start">
                <Typography className="text-sm font-normal">
                  Role Title
                </Typography>
                <Typography
                  className="text-[#E4626F] text-sm font-normal"
                  component="span"
                >
                  *
                </Typography>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter here"
                  className="border border-[#4B7D47] rounded-[8px]"
                />
              </Box>
            </Box>
            <Box className="flex flex-col gap-[4px] w-3/4">
              <Box className="p-[2px] flex flex-row justify-start">
                <Typography className="text-sm font-normal">
                  Description
                </Typography>
                <Typography
                  className="text-[#E4626F] text-sm font-normal"
                  component="span"
                >
                  *
                </Typography>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  placeholder="Enter here"
                  className=" border border-[#4B7D47] rounded-[8px] flex gap-[8px]"
                />
              </Box>
            </Box>
          </Box>
          <Typography className="text-[19px] font-normal">Permissions</Typography>
          <Box>
            <AllPermissionTable />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AllPermission;
