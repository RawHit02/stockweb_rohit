import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import { AdminIcon, AdminIconActive, ArrowDropDownIcon, ArrowForwardIosIcon, ArrowRightIcon, CoinsImg, DashboardIcon, DashboardIconActive, DummyProfile, EmployeeIcon, EmployeeIconActive, Hamburger, Logo1, StockIcon, StockIconActive, VendorManagementicon, VendorManagementiconActive } from '../assets'
import Image from 'next/image'

const SideNav = () => {
  return (
    <>
      <Box className="w-full bg-primary h-[calc(100vh-32px)] rounded-xl px-4 pt-9 pb-4 flex flex-col justify-between">
        <Box>
          <Box className="flex items-center justify-between">
            <Box>
              <Image src={Logo1} alt="logo" />
            </Box>
            <Box className="cursor-pointer">
              <Image src={Hamburger} alt="logo" />
            </Box>
          </Box>
          <Box className='mt-9 flex flex-col gap-2'>
            <Box className="flex items-center gap-[6px] p-3 rounded-lg cursor-pointer bg-primary300 nav-item active">
              <Image src={DashboardIcon} alt='dashboard' className='nav-item-icon' />
              <Image src={DashboardIconActive} alt='dashboard' className='nav-item-icon-active' />
              <Typography className='text-sm text-white nav-item-label'>Dashboard</Typography>
            </Box>
            <Box>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon className='arrow-down-icon' />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                // className='active'
                >
                  <Box className="flex items-center gap-[6px]">
                    <Image src={VendorManagementicon} alt='vendor' className='vendor-m-icon' />
                    <Image src={VendorManagementiconActive} alt='vendor' className='vendor-m-icon-active' />
                    <Typography>Vendor Management</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className='mt-2'>
                  <Box className="flex flex-col gap-[16px]">
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child active">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label text-sm'>Buyers</Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label text-sm'>Suppliers</Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon className='arrow-down-icon' />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                // className='active'
                >
                  <Box className="flex items-center gap-[6px]">
                    <Image src={EmployeeIcon} alt='vendor' className='vendor-m-icon' />
                    <Image src={EmployeeIconActive} alt='vendor' className='vendor-m-icon-active' />
                    <Typography>Employee</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className='mt-2'>
                  <Box className="flex flex-col gap-[16px]">
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child active">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label text-sm'>Manage Employee</Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label text-sm'>Today's Attendance</Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label text-sm'>Attendance Sheet</Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon className='arrow-down-icon' />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                // className='active'
                >
                  <Box className="flex items-center gap-[6px]">
                    <Image src={StockIcon} alt='vendor' className='vendor-m-icon' />
                    <Image src={StockIconActive} alt='vendor' className='vendor-m-icon-active' />
                    <Typography>Stock Management</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className='mt-2'>
                  <Box className="flex flex-col gap-[16px]">
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child active">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label text-sm'>Inward</Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label text-sm'>Outward</Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon className='arrow-down-icon' />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                // className='active'
                >
                  <Box className="flex items-center gap-[6px]">
                    <Image src={AdminIcon} alt='vendor' className='vendor-m-icon' />
                    <Image src={AdminIconActive} alt='vendor' className='vendor-m-icon-active' />
                    <Typography>Admin Management</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className='mt-2'>
                  <Box className="flex flex-col gap-[16px]">
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child active">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label text-sm'>Users</Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label text-sm'>Role & Permission</Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>
        <Box className="flex flex-col items-center cursor-pointer">
          <Image src={CoinsImg} alt='coins' />
          <Divider className='border-primary200 w-[95%] mb-4' />
          <Box className="flex items-center gap-[10px] w-full">
            <Box className="w-[50px] h-[50px] rounded-full overflow-hidden">
              <Image src={DummyProfile} alt="prifile image" />
            </Box>
            <Box>
              <Typography className='text-white font-medium'>JOHN CARTER</Typography>
              <Typography className='text-sm text-primary200 font-medium'>john@gmail.com</Typography>
            </Box>
            <ArrowForwardIosIcon className='text-white text-sm'/>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SideNav