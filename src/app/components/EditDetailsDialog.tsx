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
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { DummyProfile } from "@/app/assets";
import {
  CheckCircleIcon,
  CloseOutlinedIcon,
  FileUploadOutlinedIcon,
  EditOutlinedIcon,
} from "../assets";

const EditDetails = () => {
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
        startIcon={<EditOutlinedIcon />}
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <DialogTitle className="flex items-start justify-between pb-6 px-9 pt-9">
          <Box>
            <Typography className="text-2xl font-bold">
              Edit Basic Details
            </Typography>
            <Typography className="text-base font-normal text-[#4B7D47] mt-2">
              Update your profile
            </Typography>
          </Box>
          <IconButton onClick={handleClose} className="p-0 text-[#1C1B1F]">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="px-9 overflow-x-hidden">
          <Box className="flex flex-row gap-6 items-center relative">
            <Box className="w-[120px] h-[120px] rounded-full overflow-hidden">
              <Image
                src={DummyProfile}
                alt="image"
                className="w-[120px] h-[120px] relative"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-[1px] w-[118px] h-full opacity-0"
              />
            </Box>
            <Box className="flex flex-col justify-center gap-[8px]">
              <Box className="flex flex-row gap-[8px] items-center">
                <Button
                  variant="outlined"
                  startIcon={<FileUploadOutlinedIcon />}
                  size="large"
                >
                  <Typography className="text-base font-normal">
                    UPLOAD
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute w-[113px] bottom-0 left-[1px] h-full opacity-0"
                    />
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CloseOutlinedIcon />}
                  size="large"
                >
                  <Typography className="text-base font-normal">
                    RESET
                  </Typography>
                </Button>
              </Box>
              <Box>
                <Typography className="text-[#92929D] text-xs">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-col gap-2 pt-6">
            <Box className="flex flex-col gap-1">
              <Box>
                <Typography className=" text-primary text-sm font-normal">
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
            <Box className="flex flex-col gap-1">
              <Box>
                <Typography className=" text-primary text-sm font-normal">
                  Email
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
            <Box className="flex flex-col gap-1">
              <Box>
                <Typography className=" text-primary text-sm font-normal">
                  Contact Number
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
            <Box className="flex flex-col gap-1">
              <Box>
                <Typography className=" text-primary text-sm font-normal">
                  WhatsApp Number
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

export default EditDetails;
