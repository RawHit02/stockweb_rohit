"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ContactsOutlinedIcon, ManageAccountsOutlinedIcon, Email, Password, DummyProfile } from "@/app/assets";
import { EditDetailsDialog, ResetDialogue } from "@/app/components";
import Image from "next/image";

const UserProfile = () => {
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  const [value, setValue] = useState(1);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const openDialog = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };



  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Box>{children}</Box>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box className="bg-white rounded-[12px] border p-6 border-[#E8EBED] h-[calc(100vh-116px)] overflow-auto">
        <Box className="max-w-[615px] flex flex-col gap-6 px-6">
          <Box className="border-b border-[#C5D4DB]">
            <Tabs
              value={0}
              onChange={handleChange}
              textColor="inherit"
              aria-label="full width tabs example"
              className="min-h-[43px]"
            >
              <Tab
                disableRipple
                icon={<ManageAccountsOutlinedIcon className="text-[22px]" />}
                iconPosition="start"
                label="ACCOUNT"
                className="text-[#255435] text-[13px] flex flex-row items-center min-h-[43px]"
                {...a11yProps(0)}
              />
            </Tabs>
          </Box>
          <TabPanel value={0} index={0}>
            <Box className="h-[98px] w-[98px] rounded-full overflow-hidden">
              <Image src={DummyProfile} alt="profile" />
            </Box>
            <Box className="flex justify-between items-center my-6">
              <Box className="flex flex-col">
                <Box>
                  <Typography className="text-2xl font-semibold text-[#1D1D1D]">
                    Emily Thompson
                  </Typography>
                </Box>
                <Box>
                  <Typography className="text-sm text-[#000000]">
                    Admin
                  </Typography>
                </Box>
              </Box>
              <Box>
                <EditDetailsDialog />
              </Box>
            </Box>
            <Box className="border border-[#C5D4DB]"></Box>
            <Box className="flex justify-start gap-2 mt-6">
              <Box>
                <Image src={Email} alt="email" />
              </Box>
              <Box className="flex flex-col gap-2">
                <Box>
                  <Typography className="text-sm">Email</Typography>
                </Box>
                <Box>
                  <Typography className="text-[13px] text-[#414855]">
                    emilythomspson@gmail.com,
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="flex justify-start gap-2 mt-6">
              <Box>
                <ContactsOutlinedIcon className="text-[18px] text-gray400" />
              </Box>
              <Box className="flex flex-col gap-2">
                <Box>
                  <Typography className="text-sm">Contact</Typography>
                </Box>
                <Box>
                  <Typography className="text-[13px] text-[#414855]">
                    +91 4585 965 233
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="flex justify-start gap-2 mt-6">
              <Box>
                <ContactsOutlinedIcon className="text-[18px] text-gray400" />
              </Box>
              <Box className="flex flex-col gap-2 mb-6">
                <Box>
                  <Typography className="text-sm">
                    WhatsApp Number
                  </Typography>
                </Box>
                <Box>
                  <Typography className="text-[13px] text-[#414855]">
                    +91 4585 965 233
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="border border-[#C5D4DB]"></Box>
            <Box className="flex flex-row justify-start gap-2 mt-6">
              <Box>
                <Image src={Password} alt="Password" />
              </Box>
              <Box className="flex flex-col gap-2">
                <Box>
                  <Typography className="text-sm text-[#1D1D1D]">
                    Password
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="text"
                    className="text-[#1085B7] rounded-lg h-10 text-base normal-case"
                    onClick={openDialog}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </Box>
          </TabPanel>
        </Box>
      </Box>
      {isOpen && <ResetDialogue isOpen={isOpen} closeDialog={closeDialog} />}
    </>
  );
};

export default UserProfile;
