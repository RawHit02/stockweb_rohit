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
import {
  DeleteRed,
  DummyProfile,
  EditOutlinedIcon,
  MoreVertIcon,
} from "../assets";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { GetAllSellersRequest } from "@/models/req-model/VendorManagementSellerModel";
import {
  deleteSellerAction,
  getAllSellersAction,
} from "@/redux/vendor_management/vendor_management.actions";
import { VendorManagementSellerModel } from "@/models/req-model/VendorManagementSellerModel";
import DeleteDialog from "./DeleteDialog";
import { useRouter } from "next/navigation";

interface VendorManagementSellersProps {
  sellers: VendorManagementSellerModel[]; 
  onSellerClick: (sellerId: string) => void; // Handle row click
  onEditSeller: (row: VendorManagementSellerModel) => void; // Edit seller handler
}

const ITEM_HEIGHT = 48;

const headCells = [
  { id: "name", label: "Name/Email", numeric: false },
  { id: "contact", label: "Contact Number", numeric: false },
  { id: "whatsapp", label: "WhatsApp Number", numeric: false },
  { id: "address", label: "Address", numeric: false },
];

const VendorManagementSellers : React.FC<VendorManagementSellersProps> = ({
  onEditSeller,
  onSellerClick,
  sellers,
}) => {
   const router = useRouter();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [page, setPage] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null); // Seller ID for the menu actions
  const dispatch = useDispatch<AppDispatch>();
  const { getAllSellers, itemCount } = useAppSelector(
    (state) => state.VendorManagementReducer.sellers
  );
  const fetchData = useCallback(async () => {
    try {
      const params: GetAllSellersRequest = {
        page: page + 1,
        take: rowsPerPage,
        order,
        orderBy,
      };
      await dispatch(getAllSellersAction({ commonApiParamModel: params }));
    } catch (error) {
      console.error("Error fetching Sellers:", error);
    }
  }, [dispatch, page, rowsPerPage, order, orderBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRowClick = (sellerId: string) => {
    const encodeId = btoa(sellerId);
    router.push(`/vender-management/sellers/sellers-details?id=${encodeId}`);
  };

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    SellerId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSellerId(SellerId); 
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedSellerId(null); 
  };

  const handleEditClick = (row: VendorManagementSellerModel) => {
    onEditSeller(row);
    handleCloseMenu();
  };

   const handleDeleteSeller = async () => {
     if (selectedSellerId) {
       try {
         await dispatch(deleteSellerAction(selectedSellerId)).unwrap();
         fetchData(); // Refresh data after deletion
       } catch (error) {
         console.error("Failed to delete Seller:", error);
       }
       handleCloseMenu();
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
   const handleCloseDeleteDialog = () => {
     setOpenDelete(false);
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
            {getAllSellers.map(
              (row: VendorManagementSellerModel, index: number) => (
                <TableRow
                  key={row.id || `${index}`}
                  className="hover:cursor-pointer"
                  onClick={() => handleRowClick(row.id)} // Row click impl..
                >
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
                        <Typography className="text-xs text-gray-500">
                          {row.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.contactNumber}</TableCell>
                  <TableCell>{row.whatsappNumber}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClickMenu(event, row.id);
                      }}
                      aria-label="more"
                      >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open && selectedSellerId === row.id}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={(event) => {
                        event.stopPropagation();
                        handleEditClick(row);
                      }}
                      >
                        <EditOutlinedIcon />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={(event) =>{
                         event.stopPropagation();
                         setOpenDelete(true);
                        }}
                        >
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
          handleDeleteAction={handleDeleteSeller}
          dialogueTitle="Delete Seller"
          dialogueDescription="Are you sure you want to delete this Seller?"
        />
      )}
    </Box>
  );
};

export default VendorManagementSellers;
