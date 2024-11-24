"use client";
import React, { useState } from "react";
import { Header, SideNav } from "../components";
import { Box } from "@mui/material";
// import SecondaryHeader from "../components/SecondaryHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navOpen, setNavOpen] = useState<boolean>(true)
  const onPressButton = () => {
    setNavOpen((prev) => !prev);
  };
  
  return (
    <>
      <Box className="bg-primaryExtraLight h-screen w-full p-4">
        <Box className="flex gap-3 w-full">
          <Box className={`w-full ${navOpen ? "max-w-[270px]" : "max-w-[95px]"}`}>
            <SideNav onPress={onPressButton} navOpen={navOpen} />
          </Box>
          <Box className={`flex flex-col gap-3 ${navOpen ? "w-[calc(100%-286px)]" : "w-[calc(100%-111px)]"}`}>
            <Header/>
            {/* <SecondaryHeader /> */}
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
