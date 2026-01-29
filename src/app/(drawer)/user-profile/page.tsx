"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ContactsOutlinedIcon, ManageAccountsOutlinedIcon, Email, Password, DummyProfile } from "@/app/assets";
import { EditDetailsDialog, ResetDialogue } from "@/app/components";
import Image from "next/image";
import { apiClient } from "@/base-url/apiClient";
import { GET_USERS } from "@/base-url/apiRoutes";

const UserProfile = () => {
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [roleName, setRoleName] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const openDialog = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          // Decode token to get ID
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const decoded = JSON.parse(jsonPayload);
          
          if (decoded.role) {
            setRoleName(decoded.role);
          }

          // Fetch user details using ID (decoded.sub)
          // Assuming endpoint supports /:id
          if (decoded.sub) {
             const response = await apiClient.get(`${GET_USERS}/${decoded.sub}`);
             if (response.data && (response.data.data || response.data)) {
                // Adjust based on actual API response structure
                setUser(response.data.data || response.data);
             }
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  if (loading) {
     return <Box className="h-full flex items-center justify-center"><CircularProgress /></Box>;
  }

  return (
    <>
      <Box className="bg-white rounded-[12px] border p-6 border-[#E8EBED] h-[calc(100vh-116px)] overflow-auto">
        <Box className="max-w-[615px] flex flex-col gap-6 px-6">
          <Box className="border-b border-[#C5D4DB]">
            <Tabs
              value={value}
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
          <TabPanel value={value} index={0}>
            <Box className="h-[98px] w-[98px] rounded-full overflow-hidden">
              <Image src={DummyProfile} alt="profile" />
            </Box>
            <Box className="flex justify-between items-center my-6">
              <Box className="flex flex-col">
                <Box>
                  <Typography className="text-2xl font-semibold text-[#1D1D1D]">
                    {user?.name || "User"}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="text-sm text-[#000000]">
                    {roleName || "User"}
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
                    {user?.email || "N/A"}
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
                    {user?.phoneNumber || "N/A"}
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
                    {user?.phoneNumber || "N/A"}
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
