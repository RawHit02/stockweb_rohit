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
//import { visuallyHidden } from "@mui/utils";
//import stockManagementReducer from "@/redux/stock_management/stock_management.slice";

import {
  DeleteRed,
  DummyProfile,
  EditOutlinedIcon,
  MoreVertIcon,
} from "../assets";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { GetAllOutwardsRequest } from "@/models/req-model/StockManagementOutwardModel";
import {
  deleteOutwardAction,
  getAllOutwardsAction,
} from "@/redux/stock_management/stock_management.actions";
import { StockManagementOutwardModel } from "@/models/req-model/StockManagementOutwardModel";

const ITEM_HEIGHT = 48;
const headCellsOutward = [
  { field: "transId", headerName: "Trans ID", sortable: true }, // Transaction ID
  { field: "date", headerName: "Date", sortable: true }, // Date of the transaction
  { field: "buyerName", headerName: "Buyer", sortable: true }, // Buyer Name

  { field: "description", headerName: "Description", sortable: true }, // Description of the item
  { field: "itemType", headerName: "Item Type", sortable: true }, // Type of item (Gadget, Gold, etc.)
  { field: "quantity", headerName: "Qty.", sortable: true }, // Quantity of the item
  { field: "commission", headerName: "Commission", sortable: true }, // Commission associated with the item
  { field: "unitPrice", headerName: "Unit Price", sortable: true }, // Unit price of the item
  { field: "totalValue", headerName: "Total Value", sortable: true }, // Total value calculated from quantity * unit price
  { field: "batchNumber", headerName: "Batch No.", sortable: true }, // Batch number
  { field: "issuedBy", headerName: "Issued By", sortable: true }, // Person who received the item
  { field: "location", headerName: "Location", sortable: true }, // Location where the item is stored
  { field: "notes", headerName: "Notes", sortable: true }, // Any additional notes (Urgent, Special instructions, etc.)
  // { field: "vendor", headerName: "Vendor ID", sortable: true }, // Vendor ID (reference to the vendor table)
];

const StockManagementOutward = ({
  onEditOutward,
}: {
  onEditOutward: (row: StockManagementOutwardModel) => void;
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("transId");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedOutwardId, setSelectedOutwardId] = useState<string | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();

  const { getAllOutwards, itemCount } = useAppSelector(
    (state) => state.stockManagement.outwards
  );

  const fetchData = useCallback(async () => {
    try {
      const params: GetAllOutwardsRequest = {
        page: page + 1,
        take: rowsPerPage,
        order,
        orderBy,
      };
      await dispatch(getAllOutwardsAction({ commonApiParamModel: params }));
    } catch (error) {
      console.error("Error fetching outwards:", error);
    }
  }, [dispatch, page, rowsPerPage, order, orderBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    outwardId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOutwardId(outwardId); // Set the outward ID for menu actions
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedOutwardId(null); // Clear selected outward
  };

  const handleEditClick = (row: StockManagementOutwardModel) => {
    onEditOutward(row);
    handleCloseMenu();
  };

  const handleDeleteOutward = async () => {
    if (selectedOutwardId) {
      if (window.confirm("Are you sure you want to delete this outward?")) {
        try {
          await dispatch(deleteOutwardAction(selectedOutwardId)).unwrap();
          fetchData(); // Refresh data after deletion
        } catch (error) {
          console.error("Failed to delete outward:", error);
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
              {headCellsOutward.map((headCell) => (
                <TableCell
                  key={headCell.field} // Updated to use 'field' as the key
                  sortDirection={orderBy === headCell.field ? order : false} // Updated to use 'field'
                >
                  {headCell.sortable ? ( // Only add sorting if the column is sortable
                    <TableSortLabel
                      active={orderBy === headCell.field} // Updated to use 'field'
                      direction={orderBy === headCell.field ? order : "asc"} // Updated to use 'field'
                      onClick={(event) =>
                        handleRequestSort(event, headCell.field)
                      } // Updated to use 'field'
                    >
                      {headCell.headerName} {/* Updated to use 'headerName' */}
                      {orderBy === headCell.field ? (
                        <Box component="span" className="sr-only">
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    headCell.headerName // Display headerName without sorting
                  )}
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllOutwards.map(
              (row: StockManagementOutwardModel, index: number) => (
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
                  <TableCell>{row.buyerName || "N/A"}</TableCell>{" "}
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.itemType}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.commission}</TableCell>
                  <TableCell>{row.unitPrice}</TableCell>
                  <TableCell>{row.totalValue}</TableCell>
                  <TableCell>{row.batchNumber}</TableCell>
                  <TableCell>{row.issuedBy}</TableCell>
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
                      open={open && selectedOutwardId === row.id}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={() => handleEditClick(row)}>
                        <EditOutlinedIcon />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleDeleteOutward}>
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

export default StockManagementOutward;
