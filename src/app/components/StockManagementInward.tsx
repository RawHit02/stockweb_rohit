"use client";

import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import DeleteDialog from "./DeleteDialog";

import {
  DeleteRed,
  DummyProfile,
  EditOutlinedIcon,
  MoreVertIcon,
} from "../assets";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  CreateStockInwardPayload,
  GetAllInwardsRequest,
} from "@/models/req-model/StockManagementInwardModel";
import {
  deleteInwardAction,
  getAllInwardsAction,
} from "@/redux/stock_management/stock_management.actions";
import { StockManagementInwardModel } from "@/models/req-model/StockManagementInwardModel";

const ITEM_HEIGHT = 48;

// Updated column headers
const headCellsInward = [
  { field: "transId", headerName: "Trans ID", sortable: true },
  { field: "date", headerName: "Date", sortable: true },
  { field: "supplierName", headerName: "Supplier Name", sortable: true },
  { field: "description", headerName: "Description", sortable: true },
  { field: "itemType", headerName: "Item Type", sortable: true },
  { field: "quantity", headerName: "Qty", sortable: true },
  { field: "unitPrice", headerName: "Unit Price", sortable: true },
  { field: "commission", headerName: "Commission", sortable: true },
  { field: "totalValue", headerName: "Total Value", sortable: true },
  { field: "batchNo", headerName: "Batch No.", sortable: true },
  { field: "location", headerName: "Location", sortable: true },
  { field: "notes", headerName: "Notes", sortable: true },
];

const StockManagementInward = ({
  onEditInward,
}: {
  onEditInward: (row: StockManagementInwardModel) => void;
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("transId");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedInwardId, setSelectedInwardId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false); // Delete dialog state
  const dispatch = useDispatch<AppDispatch>();
  const { getAllInwards, itemCount } = useAppSelector(
    (state) => state.stockManagement.inwards
  );

  const fetchData = useCallback(async () => {
    try {
      const params: GetAllInwardsRequest = {
        page: page + 1,
        take: rowsPerPage,
        order,
        orderBy,
      };
      await dispatch(getAllInwardsAction({ commonApiParamModel: params }));
    } catch (error) {
      console.error("Error fetching inwards:", error);
    }
  }, [dispatch, page, rowsPerPage, order, orderBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    inwardId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedInwardId(inwardId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedInwardId(null);
  };

  const handleEditClick = (row: StockManagementInwardModel) => {
    onEditInward(row);
    handleCloseMenu();
  };

  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  const handleDeleteInward = async () => {
    if (selectedInwardId) {
      try {
        await dispatch(deleteInwardAction(selectedInwardId)).unwrap();
        fetchData(); // Refresh data after deletion
      } catch (error) {
        console.error("Failed to delete inward:", error);
      }
      setSelectedInwardId(null);
      handleCloseDeleteDialog();
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
              {headCellsInward.map((headCell) => (
                <TableCell
                  key={headCell.field}
                  sortDirection={orderBy === headCell.field ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.field}
                    direction={orderBy === headCell.field ? order : "asc"}
                    onClick={(event) =>
                      handleRequestSort(event, headCell.field)
                    }
                  >
                    {headCell.headerName}
                    {orderBy === headCell.field ? (
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
            {getAllInwards.map(
              (row: StockManagementInwardModel, index: number) => (
                <TableRow
                  key={row.id || `${index}`}
                  className="hover:cursor-pointer"
                >
                  <TableCell>
                    <Typography className="font-semibold text-sm">
                      {row.transId}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.createdDate}</TableCell>
                  <TableCell>
                    {typeof row.vendor === "object" &&
                    (row.vendor as { name: string })?.name
                      ? (row.vendor as { name: string }).name
                      : "N/A"}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {typeof row.ornament === "object" &&
                    (row.ornament as { ornamentName: string })?.ornamentName
                      ? (row.ornament as { ornamentName: string }).ornamentName
                      : "N/A"}
                  </TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.unitPrice}</TableCell>
                  <TableCell>{row.commission}</TableCell>
                  <TableCell>{row.totalValue}</TableCell>
                  <TableCell>{row.batchNumber}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(event) => handleClickMenu(event, row.id)}
                      aria-label="more"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open && selectedInwardId === row.id}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={() => handleEditClick(row)}>
                        <EditOutlinedIcon />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => setOpenDelete(true)}>
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
      {openDelete && (
        <DeleteDialog
          handleCloseDeleteDialog={handleCloseDeleteDialog}
          openDelete={openDelete}
          handleDeleteAction={handleDeleteInward}
          dialogueTitle="Delete Inward Record"
          dialogueDescription="Are you sure you want to delete this inward record?"
        />
      )}
    </Box>
  );
};

export default StockManagementInward;
