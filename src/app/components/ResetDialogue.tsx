"use client";

import React, { useEffect, useState } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";
import { CheckCircleIcon, CloseOutlinedIcon, MoreVertIcon } from "../assets";

interface DialogueProps {
  isOpen: boolean;
  closeDialog: () => void;
}

const ResetDialogue: React.FC<DialogueProps> = ({ isOpen, closeDialog }) => {
  // const [open, setOpen] = useState(false);
  // const [age, setAge] = useState("");

  // const handleClose = () => setOpen(false);

  // const handleChangeSelect = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const opened = Boolean(anchorEl);

  // const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const ITEM_HEIGHT = 48;
  const handleClose = () => {
    closeDialog();
  };
  return (
    <>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        maxWidth="sm"
      >
        <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6 gap-6">
          <Box>
            <Typography className="text-2xl font-bold">
              Reset Password
            </Typography>
            <Typography className="text-base font-normal text-secondary800 mt-2">
              Change your password
            </Typography>
          </Box>
          <IconButton onClick={handleClose} className="p-0 text-gray100">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="px-9">
          <Box
            sx={{ width: "100%" }}
            className="flex flex-col gap-[12px]"
          >
            <Box className="flex flex-col gap-[8px]">
              <Box className="flex flex-col">
                <Box className="flex flex-row justify-start">
                  <Typography className=" text-primary text-sm font-normal mb-1">
                    Current Password
                  </Typography>
                  <Typography
                    className="text-red100 text-sm font-normal"
                    component="span"
                  >
                    *
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
              <Box className="flex flex-col">
                <Box className="flex flex-row justify-start">
                  <Typography className=" text-primary text-sm font-normal mb-1">
                    New Password
                  </Typography>
                  <Typography
                    className="text-red100 text-sm font-normal"
                    component="span"
                  >
                    *
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
              <Box className="flex flex-col">
                <Box className="flex flex-row justify-start">
                  <Typography className=" text-primary text-sm font-normal mb-1">
                    Re-Enter Password
                  </Typography>
                  <Typography
                    className="text-red100 text-sm font-normal"
                    component="span"
                  >
                    *
                  </Typography>
                </Box>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter here"
                  />
                </Box>
                <Box>
                  <Typography
                    className="text-[13px] font-medium text-[#414855]"
                  >
                    Password Requirements:
                  </Typography>
                  <ul className="list-disc pl-6">
                    <Typography
                      component="li"
                      className="text-[13px] font-medium text-[#414855]"
                    >
                      Minimum 8 characters long - the more, the better
                    </Typography>
                    <Typography
                      component="li"
                      className="text-[13px] font-medium text-[#414855]"
                    >
                      At least one lowercase character
                    </Typography>
                    <Typography
                      component="li"
                      className="text-[13px] font-medium text-[#414855]"
                    >
                      At least one number, symbol, or whitespace character
                    </Typography>
                  </ul>
                </Box>
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

export default ResetDialogue;
