"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import {
  DeleteRed,
  DummyProfile,
  EditOutlinedIcon,
  MoreVertIcon,
} from "../assets";

import Image from "next/image";

import { useDispatch } from "react-redux";

import { AppDispatch, useAppSelector } from "@/redux/store";

import { EmployeeManagementEmployeeModel, GetAllEmployeesRequest } from "@/models/req-model/EmployeeManagementEmployeeModel";


import {
  deleteEmployeeAction,
  getAllEmployeesAction,
} from "@/redux/employee_management/employee_management.actions";

const ITEM_HEIGHT = 48;


const headCells = [
  { id: "name", label: "Name", numeric: false },
  { id: "email", label: "Email", numeric: false },
  { id: "phone", label: "Phone Number", numeric: false },
  { id: "address", label: "Address", numeric: false },
  {id: "employeeShift" , label: "employee Shift" , numeric : false},
];

const EmployeeManagementEmployees = ({
  onEditEmployee,
}: {
  onEditEmployee: (row: EmployeeManagementEmployeeModel) => void;
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null); // Employee ID for the menu actions
  
  const dispatch = useDispatch<AppDispatch>();
  const { getAllEmployees, itemCount } = useAppSelector(
    (state) => state.EmployeeManagementReducer.employees
  );

  const fetchData = async () => {
    try {
      const params: GetAllEmployeesRequest = {
        page: page + 1,
        take: rowsPerPage,
        order,
        orderBy,
      };
      await dispatch(getAllEmployeesAction({ commonApiParamModel: params }));
    } catch (error) {
      console.error("Error fetching Employees:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, order, orderBy]);

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    EmployeeId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployeeId(EmployeeId); // Clear selected Employee
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedEmployeeId(null); // Clear selected Employee
  };

  const handleEditClick = (row: EmployeeManagementEmployeeModel) => {
    onEditEmployee(row);
    handleCloseMenu();
  };

  const handleDeleteEmployee = async () => {
    if (selectedEmployeeId) {
      if (window.confirm("Are you sure you want to delete this Employee?")) {
        try {
          await dispatch(deleteEmployeeAction(selectedEmployeeId)).unwrap();
          fetchData(); // Refresh data after deletion
        } catch (error) {
          console.error("Failed to delete Employee:", error);
        }
      }
      handleCloseMenu();
    }
  };

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    fetchData();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    fetchData();
  };
  return (
    <Box className="w-full primary-table">
      <TableContainer>
        <Table className="min-w-[750px]" size="small">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" className="sr-only">
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllEmployees.map(
              (row: EmployeeManagementEmployeeModel, index: number) => (
                <TableRow
                  key={row.id || `${index}`}
                  className="hover:cursor-pointer"
                >
                  {/*Name Column*/}
                  <TableCell>
                    <Box className="flex items-center gap-2">
                      <Box className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={row.profileImage || DummyProfile}
                          alt={row.name || "Profile"}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </Box>
                      <Box>
                        <Typography className="font-semibold text-sm">
                          {row.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  {/* Email Column */}
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.employeeShift}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(event) => handleClickMenu(event, row.id)}
                      aria-label="more"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open && selectedEmployeeId === row.id}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={() => handleEditClick(row)}>
                        <EditOutlinedIcon />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleDeleteEmployee}>
                        <Image src={DeleteRed} alt="Delete" />
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={itemCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default EmployeeManagementEmployees;
