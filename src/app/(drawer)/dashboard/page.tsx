"use client"
import { ContactsOutlinedIcon, DashChartIcon, DashEditIcon, DashSuitCaseIcon, Ellipses, LocalOfferOutlinedIcon, OverDueIcon, ShieldPersonIcon, TotalSellerIcon } from "@/app/assets";
import { DiamodStock, GoldStock, SilverStock } from "@/app/components";
import { Box, Typography, Grid2 as Grid } from "@mui/material";
import Image from "next/image";

const Dashboard = () => {
  return (
    <>
      <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12, lg: 6 }}>
            <Grid container spacing={2}>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="w-[148px] h-[148px] rounded-full bg-[#15B097] absolute top-[-126px] right-[-126px] dash-corner"></Box>
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={OverDueIcon} alt="overdue" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">TOTAL OVER DUE</Typography>
                  <Typography className="text-xl text-gray400 font-medium">$56,562</Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="w-[148px] h-[148px] rounded-full bg-[#15B097] absolute top-[-126px] right-[-126px] dash-corner"></Box>
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={TotalSellerIcon} alt="total seller" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">TOTAL SELLER</Typography>
                  <Typography className="text-xl text-gray400 font-medium">200</Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="w-[148px] h-[148px] rounded-full bg-[#15B097] absolute top-[-126px] right-[-126px] dash-corner"></Box>
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <ContactsOutlinedIcon className="text-[#1D1D1D] text-[18px]" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">TOTAL BUYERS</Typography>
                  <Typography className="text-xl text-gray400 font-medium">200</Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="w-[148px] h-[148px] rounded-full bg-[#15B097] absolute top-[-126px] right-[-126px] dash-corner"></Box>
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={DashEditIcon} alt="edit" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">TOTAL EMPLOYEE</Typography>
                  <Typography className="text-xl text-gray400 font-medium">200</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 6 }}>
            <Grid container spacing={2}>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="w-[148px] h-[148px] rounded-full bg-[#15B097] absolute top-[-126px] right-[-126px] dash-corner"></Box>
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={ShieldPersonIcon} alt="overdue" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">TOTAL USERS</Typography>
                  <Typography className="text-xl text-gray400 font-medium">200</Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="w-[148px] h-[148px] rounded-full bg-[#15B097] absolute top-[-126px] right-[-126px] dash-corner"></Box>
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={DashChartIcon} alt="overdue" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">TOTAL REVENUE</Typography>
                  <Typography className="text-xl text-gray400 font-medium">200</Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="w-[148px] h-[148px] rounded-full bg-[#15B097] absolute top-[-126px] right-[-126px] dash-corner"></Box>
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={DashSuitCaseIcon} alt="overdue" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">TOTAL PURCHASE</Typography>
                  <Typography className="text-xl text-gray400 font-medium">200</Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="w-[148px] h-[148px] rounded-full bg-[#15B097] absolute top-[-126px] right-[-126px] dash-corner"></Box>
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <LocalOfferOutlinedIcon className="text-gray100 text-[20px]" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">TOTAL OVER DUE</Typography>
                  <Typography className="text-xl text-gray400 font-medium">200</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mt-4">
          <Grid size={{ xs: 4, md: 4, lg: 4 }}>
            <DiamodStock />
          </Grid>
          <Grid size={{ xs: 4, md: 4, lg: 4 }}>
            <GoldStock />
          </Grid>
          <Grid size={{ xs: 4, md: 4, lg: 4 }}>
            <SilverStock />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
