"use client"
import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Avatar, Divider, Switch, Typography } from '@mui/material';
import Image from 'next/image';
import { AddressIcon, BlockIcon, ContentCopyIcon, DeleteIcon, DiamondImage, DummyProfile, EmailIcon, LocalPhoneIcon, TransactionIcon, UserProfileIcon, WhatsappIcon } from '@/app/assets';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

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
        <Box className="px-4">
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const BuyerDetails = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box className="bg-white rounded-xl py-2 h-[calc(100vh-116px)] overflow-auto">
        <Box sx={{ width: '100%' }} className="primary-tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            aria-label="full width tabs example"
            className='px-4 pb-2'
          >
            <Tab icon={<Image src={(UserProfileIcon) as any} alt='tab' />} iconPosition='start' label="User Profile" {...a11yProps(0)} />
            <Tab icon={<Image src={(TransactionIcon) as any} alt='tab' />} iconPosition='start' label="Transaction" {...a11yProps(1)} />
          </Tabs>
          <Divider className='border-2 border-primaryExtraLight' />
          <TabPanel value={value} index={0}>
            <Typography className='text-2xl font-bold mt-5'>User Profile</Typography>
            <Box className="border border-primary100 rounded-lg p-6 mt-4">
              <Box className="bg-primaryExtraLight flex items-center justify-between rounded-2xl p-4 pr-0 linear-gradient-bg">
                <Box className="flex items-center gap-4">
                  <Box className="w-[112px] h-[112px] rounded-full border-[8px] border-[#EEF2FF] overflow-hidden">
                    <Image src={DummyProfile} alt='profile' />
                  </Box>
                  <Box>
                    <Typography className='text-primary text-2xl font-bold leading-6'>Flores Juanita (Buyer)</Typography>
                    <Box className="flex items-center gap-2 mt-3">
                      <EmailIcon className='text-primary200 text-xl' />
                      <Typography className='text-sm text-primary'>ayesghaoparween@gmail.com</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Image src={DiamondImage} alt='diamond' />
                </Box>
              </Box>
              <Box className="flex items-center gap-[10px] mt-[10px]">
                <Box className="border border-primary100 rounded-lg p-5 max-w-[249px] w-full">
                  <Typography className='text-primary500 font-semibold text-base'>TOTAL DUES</Typography>
                  <Typography className='text-primary text-sm mt-2'>-No Dues-</Typography>
                </Box>
                <Box className="border border-primary100 rounded-lg p-5 max-w-[249px] w-full">
                  <Typography className='text-primary500 font-semibold text-base'>TOTAL SELL</Typography>
                  <Typography className='text-primary text-sm mt-2'>$-50000.00</Typography>
                </Box>
              </Box>
              <Box className="mt-6 flex flex-col gap-4">
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-2">
                    <LocalPhoneIcon className='text-gray100' />
                    <Typography className='text-primary text-sm'>Phone Number</Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <Typography className='text-purple100 text-sm'>+91 9045896 325</Typography>
                    <ContentCopyIcon className='text-gray100 text-lg' />
                  </Box>
                </Box>
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-2">
                    <Image src={WhatsappIcon} alt='whatsapp' />
                    <Typography className='text-primary text-sm'>WhatsApp Number</Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <Typography className='text-purple100 text-sm'>+91 9045896 325</Typography>
                    <ContentCopyIcon className='text-gray100 text-lg' />
                  </Box>
                </Box>
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-2">
                    <Image src={AddressIcon} alt='address' />
                    <Typography className='text-primary text-sm'>Address</Typography>
                  </Box>
                  <Typography className='text-purple100 text-sm'>2337 Kildeer Drive, Kentucky, Canada</Typography>
                  {/* <Box className="flex items-center gap-2">
                    <ContentCopyIcon className='text-gray100 text-lg' />
                  </Box> */}
                </Box>

              </Box>
            </Box>
            <Box className="border border-primary100 rounded-lg p-6 mt-4 flex flex-col gap-3">
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-2">
                  <BlockIcon className='text-gray100 text-xl' />
                  <Typography className='text-primary text-sm'>Block</Typography>
                </Box>
                <Switch className='primary-switch' />
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-2">
                  <Image src={DeleteIcon} alt='delte' />
                  <Typography className='text-primary text-sm'>You can delete account</Typography>
                </Box>
                <Typography className='text-error200 text-base cursor-pointer'>Delete Account</Typography>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </Box>
    </>
  )
}

export default BuyerDetails