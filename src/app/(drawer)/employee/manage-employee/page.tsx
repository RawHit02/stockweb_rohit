"use client";


import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddEmployeeDialog from "@/app/components/AddNewEmployeeDialog";
import EmployeeManagementEmployee from "@/app/components/EmployeeManagementEmployee";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getAllEmployeesAction } from "@/redux/employee_management/employee_management.actions";
import AddNewEmployeeDialog, {
  EmployeeFormValues,
} from "@/app/components/AddNewEmployeeDialog";
import { EmployeeManagementEmployeeModel } from "@/models/req-model/EmployeeManagementEmployeeModel";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Employees = () => {
  const [editedEmployee, setEditedEmployee] =
    useState<EmployeeFormValues | null>(null);
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);
  const [refreshEmployeeList, setRefreshEmployeeList] = useState(false);


  const normalizeNumberForEdit = (number: string) => {
    return number.startsWith("+91") ? number.slice(3) : number;
  };

  const handleEditEmployee = (employee: EmployeeFormValues) => {
    setEditedEmployee(employee);
    setIsAddEmployeeDialogOpen(true);
  };

  const handleAddEmployee = () => {
    setEditedEmployee(null); 
    setIsAddEmployeeDialogOpen(true); 
  };


  // Close dialog handler
  const handleCloseDialog = () => {
    setIsAddEmployeeDialogOpen(false); 
    setEditedEmployee(null); 
  };


  const handleEmployeeCreated = () => {
    setRefreshEmployeeList((prev) => !prev); 
    setIsAddEmployeeDialogOpen(false); 
  };


  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      {/* Header */}
      <Box className="w-full flex items-center justify-between">
        <Typography className="text-2xl font-bold">
          Employee Management
        </Typography>
        <Button
          variant="contained"
          className="bg-primary500 rounded-lg h-10 text-base"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddEmployee}
        >
          ADD Employee
        </Button>
      </Box>

      {/* Employee List */}
      <Box className="mt-4">
        <EmployeeManagementEmployee
          onEditEmployee={handleEditEmployee}
          refreshList={refreshEmployeeList} 
        />
      </Box>

      {/* Add/Edit Dialog */}
      <AddNewEmployeeDialog
        onEmployeeCreated={handleEmployeeCreated} 
        initialValues={editedEmployee || undefined} 
        isEditMode={Boolean(editedEmployee?.id)}
        open={isAddEmployeeDialogOpen} 
        onClose={handleCloseDialog} 
      />
    </Box>
  );
};

export default Employees;
