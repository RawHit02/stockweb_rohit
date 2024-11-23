"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { AddAttendance, PrimaryTableExample } from "@/app/components";
import { CircularProgress } from "@/app/components";
import { CircularSecon } from "@/app/components";

const todaysAttendance = () => {
  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      <Box className="flex flex-col gap-[16px]">
        <Box className="w-full flex items-center justify-between">
          <Typography variant="h1">Today's Attendance</Typography>
          <Box>
            <AddAttendance />
          </Box>
        </Box>
        <Box className="flex flex-row gap-[16px]">
          <Box className="rounded-[16px] p-[24px] flex flex-col gap-[16px] border-[1px] border-[#255435]">
            <CircularProgress />
            <Typography variant="body1" className="flex flex-row self-center">
              Total:42
            </Typography>
          </Box>
          <Box className="rounded-[16px] p-[24px] border-[1px] flex flex-col gap-[16px] border-[#255435]">
            <CircularSecon />
            <Typography variant="body1" className="flex flex-row self-center">
              Total:10
            </Typography>
          </Box>
        </Box>
        <Box className="mt-4">
          <PrimaryTableExample />
        </Box>
      </Box>
    </Box>
  );
};

export default todaysAttendance;
