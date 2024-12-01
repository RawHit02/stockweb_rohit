"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { AddAttendanceDialog, PrimaryTableExample, TotalAbsentPercentage, TotalPresentPercentage } from "@/app/components";

const TodaysAttendance = () => {
  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      <Box className="flex flex-col">
        <Box className="w-full flex items-center justify-between mb-4">
          <Typography className="text-2xl font-bold">
            Today&apos;s Attendance
          </Typography>
          <Box>
            <AddAttendanceDialog />
          </Box>
        </Box>
        <Box className="flex flex-row gap-4">
          <Box className="rounded-2xl p-6 flex flex-col gap-4 border border-primary500">
            <TotalPresentPercentage />
            <Typography className="flex flex-row self-center text-base font-medium">
              Total:42
            </Typography>
          </Box>
          <Box className="rounded-2xl p-6 border flex flex-col gap-4 border-primary500">
            <TotalAbsentPercentage />
            <Typography className="flex flex-row self-center text-base font-medium">
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
