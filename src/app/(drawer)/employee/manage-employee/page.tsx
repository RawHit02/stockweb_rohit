
"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddEmployeeDialog from "@/app/components/AddNewEmployeeDialog";
import EmployeeManagementEmployee from "@/app/components/EmployeeManagementEmployee";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getAllEmployeesAction } from "@/redux/employee_management/employee_management.actions";
import AddNewEmployeeDialog, { EmployeeFormValues } from "@/app/components/AddNewEmployeeDialog";
import {EmployeeManagementEmployeeModel } from "@/models/req-model/EmployeeManagementEmployeeModel";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";



const Employees = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedEmployee, setEditedEmployee] =
    useState<EmployeeFormValues | null>(null); // Store Employee data for edit
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false); // Control dialog visibility

  const fetchData = async () => {
    const params = {
      page: 1,
      take: 10,
      order: "asc",
      orderBy: "name",
    };
    try {
      await dispatch(
        getAllEmployeesAction({ commonApiParamModel: params })
      ).unwrap();
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const refreshEmployees = async () => {
    await fetchData();
  };

  const normalizeNumberForEdit = (number: string) => {
    return number.startsWith("+91") ? number.slice(3) : number;
  };

  const handleEditEmployee = (employee: EmployeeManagementEmployeeModel) => {
    setEditedEmployee({
      id: employee.id,
      name: employee.name,
      phoneNumber: normalizeNumberForEdit(employee.phoneNumber),
      email: employee.email,
      address: employee.address,
      employeeShift: employee.employeeShift,
      profileImage: null, // Handle profile image as needed
    });
    setIsAddEmployeeDialogOpen(true);
  };

  const handleAddEmployee = () => {
    setEditedEmployee(null); // Reset edited
    setIsAddEmployeeDialogOpen(true); // Open dialog for adding 
  };

  // Close dialog handler
  const handleCloseDialog = () => {
    setIsAddEmployeeDialogOpen(false); // Close dialog
    setEditedEmployee(null); // Reset edited data
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <EmployeeManagementEmployee onEditEmployee={handleEditEmployee} />
      </Box>

      {/* Add/Edit Dialog */}
      <AddNewEmployeeDialog
        onEmployeeCreated={refreshEmployees} // Refresh Employee after dialog submission
        initialValues={editedEmployee || undefined} // Prefill data for edit
        isEditMode={Boolean(editedEmployee?.id)} // Indicate edit mode
        open={isAddEmployeeDialogOpen} // Dialog visibility control
        onClose={handleCloseDialog} // Close dialog handler
      />
    </Box>
  );
};

export default Employees;










