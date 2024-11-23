// components/AddNewBuyerDialog.tsx
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
  KeyboardArrowDownIcon,
} from "../assets";
import { imagepic } from "../assets";
import { upload } from "@/app/assets";
import { close } from "@/app/assets";

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
        Add Employee
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
            <Typography variant="h1">Add Employee</Typography>
            <Typography variant="body1" className="text-[#4B7D47] mt-2">
              Enter details of your employee
            </Typography>
          </Box>
          <IconButton onClick={handleClose} className="p-0 text-[#1C1B1F]">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="px-9">
          <Box className="flex flex-row gap-[24px]">
            <Box>
              <Box className="border-[6px] border-[#B6D063] rounded-[50%] w-[121px] h-[121px] bg-[#EDFFF2] relative">
                <Image
                  src={imagepic}
                  alt="image"
                  className="absolute top-[35px] left-[35px]"
                />
              </Box>
            </Box>
            <Box className="flex flex-col justify-center gap-[8px]">
              <Box className="flex flex-row gap-[8px] items-center">
                <Button
                  variant="outlined"
                  className="rounded-[8px] border-[1px] pt-[10px] pb-[10px] pl-[12px] pr-[20px] flex flex-row gap-[10px]"
                >
                  <Image src={upload} alt="upload" />
                  <Typography variant="body1">UPLOAD</Typography>
                </Button>
                <Button
                  variant="outlined"
                  className="rounded-[8px] border-[1px] pt-[10px] pb-[10px] pl-[12px] pr-[20px] flex flex-row gap-[10px]"
                >
                  <Image src={close} alt="reset" />
                  <Typography variant="body1">RESET</Typography>
                </Button>
              </Box>
              <Box>
                <Typography variant="body2" className="text-[#92929D]">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ width: "100%" }}
            className="flex flex-col gap-[12px] mt-[25px]"
          >
            <Box className="flex flex-col gap-[4px]">
              <Box className="p-[2px]">
                <Typography variant="h5" className=" text-primary mb-1">
                  Name
                </Typography>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter here"
                />
              </Box>
            </Box>
            <Box className="flex flex-col gap-[4px]">
              <Box className="p-[2px]">
                <Typography variant="h5" className=" text-primary mb-1">
                  Contact Number
                </Typography>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className="text-[#4B7D47]"
                        >
                          +1
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </Box>
            <Box className="flex flex-col gap-[4px]">
              <Box className="p-[2px]">
                <Typography variant="h5" className=" text-primary mb-1">
                  Email
                </Typography>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="example@mail.com"
                />
              </Box>
            </Box>
            <Box className="flex flex-col gap-[4px]">
              <Box className="p-[2px]">
                <Typography variant="h5" className=" text-primary mb-1">
                  Address
                </Typography>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter here"
                />
              </Box>
            </Box>
            <Box className="flex flex-col gap-[4px]">
              <Box className="p-[2px]">
                <Typography variant="h5" className=" text-primary mb-1">
                  Shift
                </Typography>
              </Box>
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
                    <MenuItem value={10}>Day</MenuItem>
                    <MenuItem value={20}>Night</MenuItem>
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
