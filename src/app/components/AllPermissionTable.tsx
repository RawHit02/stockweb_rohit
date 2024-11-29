"use client";

import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
// import { visuallyHidden } from "@mui/utils";
import Checkbox from "@mui/material/Checkbox";

const AllPermissionTable = () => {
  return (
    <Box sx={{ width: "100%" }} className="permission-table">
      <TableContainer>
        <Table>
          <TableHead className="bg-[#F5FBFF]">
            <TableRow>
              <TableCell>
                <Box>
                  <Typography className="text-sm font-normal">
                    Module
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography className="text-sm font-normal">
                  Permission
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="border-b border-[#C5D4DB] pr-4 pl-4">
              <TableCell>
                <Typography className="text-sm font-normal">
                  Dashboard
                </Typography>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" color="primary" />
                  <Typography className="text-sm font-normal">View</Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-[#C5D4DB] pr-4 pl-4 ">
              <TableCell>
                <Typography className="text-sm font-normal">Buyer</Typography>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">View</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">
                    Manage
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-[#C5D4DB] pr-4 pl-4 ">
              <TableCell>
                <Typography className="text-sm font-normal">Seller</Typography>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">View</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">
                    Manage
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-[#C5D4DB] pr-4 pl-4 ">
              <TableCell>
                <Typography className="text-sm font-normal">
                  Manage Employee
                </Typography>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">View</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">
                    Manage
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-[#C5D4DB] pr-4 pl-4 ">
              <TableCell>
                <Typography className="text-sm font-normal">
                  Today&apos;s Attendance
                </Typography>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">View</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">
                    Manage
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-[#C5D4DB] pr-4 pl-4 ">
              <TableCell>
                <Typography className="text-sm font-normal">
                  Attendance Sheet
                </Typography>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">View</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">
                    Manage
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-[#C5D4DB] pr-4 pl-4 h-[48px]">
              <TableCell>
                <Typography className="text-sm font-normal">
                  Stock Inward
                </Typography>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">View</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">
                    Manage
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-[#C5D4DB] pr-4 pl-4 ">
              <TableCell>
                <Typography className="text-sm font-normal">
                  Stock Outward
                </Typography>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">View</Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-[#C5D4DB] pr-4 pl-4 ">
              <TableCell>
                <Typography className="text-sm font-normal">
                  Roles & Permissions
                </Typography>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">View</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex flex-row gap-[10px] items-center">
                  <Checkbox className="p-0 text-[#4B7D47]" />
                  <Typography className="text-sm font-normal">
                    Manage
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllPermissionTable;
