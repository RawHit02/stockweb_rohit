"useclient";

import React from "react";
import { Box, Typography } from "@mui/material";
import { AttendanceTable, DateAttendanceSheet } from "@/app/components";

const AttendanceSheet = () => {
  return (
    <Box className="p-[24px] border-[1px] border-[#E8EBED] rounded-[12px] bg-white">
      <Box className="flex flex-col gap-[16px]">
        <Box className="flex flex-row justify-between items-center">
          <Box className="flex flex-row self-center">
            <Typography className="text-2xl font-bold">
              Attendance Sheet
            </Typography>
          </Box>
          <Box>
            <DateAttendanceSheet />
          </Box>
        </Box>
        <AttendanceTable />
      </Box>
    </Box>
  );
};

export default AttendanceSheet;
