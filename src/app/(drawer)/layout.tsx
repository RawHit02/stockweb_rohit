"use client";
import React from "react";
import { Header, SideNav } from "../components";
import { Box } from "@mui/material";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Box className="bg-primaryLight h-screen w-full">
        <Box>
          <SideNav />
          <Box>
            <Header />
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
