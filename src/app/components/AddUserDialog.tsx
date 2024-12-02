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
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Image from "next/image";
import {
  AddCircleOutlineOutlinedIcon,
  CheckCircleIcon,
  CloseOutlinedIcon,
  FileUploadOutlinedIcon,
  KeyboardArrowDownIcon,
  UploadImageIcon,
} from "../assets";

const AddEmployeeDialog = () => {
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
        Add user
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
            <Typography className="text-2xl font-bold">Add Users</Typography>
            <Typography className="text-base font-normal text-[#4B7D47] mt-2">
              Enter details for add users
            </Typography>
          </Box>
          <IconButton onClick={handleClose} className="p-0 text-[#1C1B1F]">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="px-9">
          <Box className="flex flex-row gap-[24px]">
            <Box>
              <Box className="border-[6px] border-primary200 bg-primaryExtraLight rounded-full overflow-hidden w-[120px] h-[120px] flex items-center justify-center relative">
                <Image src={UploadImageIcon} alt="Upload" />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute opacity-0 w-full h-full"
                />
              </Box>
            </Box>
            <Box className="flex flex-col justify-center gap-[8px]">
              <Box className="flex items-center gap-2">
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<FileUploadOutlinedIcon />}
                  component="label"
                >
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    hidden

                  />
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CloseOutlinedIcon />}
                >
                  Reset
                </Button>
              </Box>
              <Box>
                <Typography className="text-[#92929D] text-xs">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ width: "100%" }}
            className="flex flex-col gap-[12px] mt-[25px]"
          >
            <Box className="flex flex-col">
              <Typography className=" text-primary text-sm font-normal mb-1">
                Name
              </Typography>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter here"
                />
              </Box>
            </Box>
            <Box className="flex flex-col">
              <Typography className=" text-primary text-sm font-normal mb-1">
                Email
              </Typography>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter here"
                />
              </Box>
            </Box>
            <Box className="flex flex-col">
              <Typography className=" text-primary text-sm font-normal mb-1">
                Password
              </Typography>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter here"
                />
              </Box>
            </Box>
            <Box className="flex flex-col">
              <Typography className=" text-primary text-sm font-normal mb-1">
                Role
              </Typography>
              <Box>
                <FormControl fullWidth>
                  <Select
                    size="medium"
                    value={age}
                    onChange={handleChangeSelect}
                    displayEmpty
                    IconComponent={() => (
                      <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-1" />
                    )}
                  >
                    <MenuItem disabled value="">
                      Select
                    </MenuItem>
                    <MenuItem value={10}>Sub-Admin</MenuItem>
                    <MenuItem value={20}>Seller</MenuItem>
                    <MenuItem value={30}>Manager</MenuItem>
                    <MenuItem value={40}>Admin</MenuItem>
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

export default AddEmployeeDialog;
