"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { AddAttendance, PrimaryTableExample } from "@/app/components";
import { CircularProgress } from "@/app/components";
import { CircularSecon } from "@/app/components";

const TodaysAttendance = () => {
  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      <Box className="flex flex-col gap-4">
        <Box className="w-full flex items-center justify-between">
          <Typography className="text-2xl font-bold">Today's Attendance</Typography>
          <Box>
            <AddAttendance />
          </Box>
        </Box>
        <Box className="flex flex-row gap-4">
          <Box className="rounded-2xl p-6 flex flex-col gap-4 border border-primary500">
            <CircularProgress />
            <Typography variant="body1" className="flex flex-row self-center">
              Total:42
            </Typography>
          </Box>
          <Box className="rounded-2xl p-6 border flex flex-col gap-4 border-primary500">
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

export default TodaysAttendance;
