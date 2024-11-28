"use client";

import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Typography } from "@mui/material";
import { search } from "@/app/assets";
import Image from "next/image";

const DateAttendanceSheet = () => {
  return (
    <Box className="flex flex-row gap-[8px] justify-center">
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Choose Start Date"
              className="overflow-hidden p-[0px] border-[#4B7D47] text-[#4B7D47]"
              slotProps={{
                // Targets the `IconButton` component.
                openPickerButton: {
                  color: "primary",
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Choose End Date"
              className="p-[0px] overflow-hidden border-[#4B7D47] text-[#4B7D47]"
              slotProps={{
                // Targets the `IconButton` component.
                openPickerButton: {
                  color: "primary",
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Button
        variant="contained"
        size="small"
        className="bg-primary500 rounded-lg h-[46px] text-base flex flex-row self-end gap-[10px] pt-[10px] pb-[10px] pl-[12px] pr-[16px]"
      >
        <Image
          src={search}
          alt="search"
          className="flex flex-row self-center"
        />
        <Typography className="text-base font-medium">Search</Typography>
      </Button>
    </Box>
  );
};

export default DateAttendanceSheet;
