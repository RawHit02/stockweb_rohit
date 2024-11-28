"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  AddCircleOutlineOutlinedIcon,
  CheckCircleIcon,
  CloseOutlinedIcon,
  KeyboardArrowDownIcon,
} from "../assets";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const AddAttendanceDialog = () => {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <Button
        variant="contained"
        className="bg-primary500 rounded-lg h-10 text-base"
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={handleClickOpen}
      >
        Add Attendance
      </Button>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
          <Box>
            <Typography className="text-2xl leading-6 font-semibold">Add Attendance</Typography>
            <Typography className="text-secondary800 mt-2">
              Enter your employee attendance
            </Typography>
          </Box>
          <IconButton onClick={handleClose} className="p-0 text-gray100">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="px-9">
          <Box sx={{ width: "100%" }} className="flex flex-col gap-[12px]">
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">
                Name
              </Typography>
              <Box>
                <FormControl fullWidth className="mt-2">
                  <Select
                    size="medium"
                    value={age}
                    onChange={handleChangeSelect}
                    displayEmpty
                    IconComponent={() => (
                      <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-3" />
                    )}
                  >
                    <MenuItem disabled value="">
                      Select
                    </MenuItem>
                    <MenuItem value={10}>Cameron Williamson</MenuItem>
                    <MenuItem value={20}>Savannah Nguyen</MenuItem>
                    <MenuItem value={30}>Theresa Webb</MenuItem>
                    <MenuItem value={40}>Kristin Watson</MenuItem>
                    <MenuItem value={50}>Darrell Steward</MenuItem>
                    <MenuItem value={60}>Bessie Cooper</MenuItem>
                    <MenuItem value={70}>Robert Fox</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box className="flex flex-col">
              <Box>
                <Typography className="text-sm text-primary">
                  In time
                </Typography>
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      className="overflow-hidden w-full"
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
            </Box>
            <Box className="flex flex-col">
              <Box>
                <Typography className="text-sm text-primary">
                  Out time
                </Typography>
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      className="overflow-hidden border-primary500 w-full"
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
            </Box>
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">
                Status
              </Typography>
              <Box>
                <FormControl fullWidth className="mt-2">
                  <Select
                    size="medium"
                    value={age}
                    onChange={handleChangeSelect}
                    displayEmpty
                    IconComponent={() => (
                      <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-3" />
                    )}
                  >
                    <MenuItem disabled value="">
                      Select
                    </MenuItem>
                    <MenuItem value={10}>Present</MenuItem>
                    <MenuItem value={20}>Absent</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="mb-[36px] px-9">
          <Button
            variant="outlined"
            size="large"
            startIcon={<CloseOutlinedIcon />}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CheckCircleIcon className="!text-[20px]" />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddAttendanceDialog;
