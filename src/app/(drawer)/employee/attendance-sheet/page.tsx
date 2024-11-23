"useclient";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DateAttendanceSheet } from "@/app/components";
import { PrimaryTableExample } from "@/app/components";

const attendanceSheet = () => {
  return (
    <Paper
      elevation={0}
      className="p-[24px] border-[1px] border-[#E8EBED] rounded-[12px] "
    >
      <Box className="flex flex-col gap-[16px]">
        <Box className="flex flex-row justify-between items-center">
          <Box className="flex flex-row self-center">
            <Typography variant="h1">Attendance Sheet</Typography>
          </Box>
          <Box>
            <DateAttendanceSheet />
          </Box>
        </Box>
        <PrimaryTableExample />
      </Box>
    </Paper>
  );
};

export default attendanceSheet;
