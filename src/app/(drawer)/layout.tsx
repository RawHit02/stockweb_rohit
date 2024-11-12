"use client";
import React from "react";
import { Header, SideNav } from "../components";
import { Box } from "@mui/material";
// import SecondaryHeader from "../components/SecondaryHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Box className="bg-primaryExtraLight h-screen w-full p-4">
        <Box className="flex gap-3 w-full">
          <Box className="max-w-[270px] w-full">
            <SideNav />
          </Box>
          <Box className="w-calc(100%-286px) flex flex-col gap-3 w-full">
            <Header/>
            {/* <SecondaryHeader /> */}
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
