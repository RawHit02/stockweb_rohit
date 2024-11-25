// "use client"
// import React, { useState } from 'react'
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import { visuallyHidden } from '@mui/utils';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import { styled } from '@mui/material/styles';


// interface Data {
//   id: number;
//   transID: string;
//   date: string;
//   itemDescription: string;
//   quantity: number;
//   basePricePerUnit: number;
//   baseTotal: number;
//   commissionValue: number;
//   totalPrice: number;
//   amountPaid: number;
//   balanceDue: number;
//   paymentMethod: string;
//   status: string;
//   notes: string;
// }

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   "&.MuiTableCell-head": {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   "&.MuitiTableCell-body": {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
// }));




//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));


// function createData(
//   id: number,
//   transID: string,
//   date: string,
//   itemDescription: string,
//   quantity: number,
//   basePricePerUnit: number,
//   commissionValue: number,
//   amountPaid: number,
//   paymentMethod: string,
//   status: string,
//   notes: string
// ): Data {
//   const baseTotal = quantity * basePricePerUnit;
//   const totalPrice = baseTotal + commissionValue;
//   const balanceDue = totalPrice - amountPaid;

//   return {
//     id,
//     transID,
//     date,
//     itemDescription,
//     quantity,
//     basePricePerUnit,
//     baseTotal,
//     commissionValue,
//     totalPrice,
//     amountPaid,
//     balanceDue,
//     paymentMethod,
//     status,
//     notes
//   };
// }
// const rows = [
//   createData(1, 'TXN001', '2024-11-13', 'Cupcake', 10, 3.5, 5, 30, 'Credit Card', 'Paid', 'First order'),
//   createData(2, 'TXN002', '2024-11-13', 'Donut', 20, 2.0, 3, 35, 'Cash', 'Pending', 'Second order'),
//   createData(3, 'TXN003', '2024-11-13', 'Eclair', 15, 4.0, 4, 50, 'Debit Card', 'Paid', 'Promo discount applied'),
//   createData(4, 'TXN004', '2024-11-13', 'Frozen yoghurt', 8, 3.0, 2, 20, 'Online Payment', 'Pending', 'Urgent delivery'),
//   createData(5, 'TXN005', '2024-11-13', 'Gingerbread', 12, 5.0, 6, 40, 'Credit Card', 'Paid', 'Special request'),
//   createData(6, 'TXN006', '2024-11-13', 'Honeycomb', 5, 10.0, 5, 20, 'Cash', 'Paid', 'Loyal customer discount'),
//   createData(7, 'TXN007', '2024-11-13', 'Ice cream sandwich', 7, 6.0, 3, 25, 'Credit Card', 'Pending', 'Bulk order'),
//   createData(8, 'TXN008', '2024-11-13', 'Jelly Bean', 30, 1.5, 2, 45, 'Online Payment', 'Paid', 'Gift item'),
//   createData(9, 'TXN009', '2024-11-13', 'KitKat', 10, 2.5, 3, 28, 'Debit Card', 'Paid', 'Recurring order'),
//   createData(10, 'TXN010', '2024-11-13', 'Lollipop', 25, 1.2, 1, 30, 'Cash', 'Pending', 'Bulk purchase'),
//   createData(11, 'TXN011', '2024-11-13', 'Marshmallow', 8, 3.5, 2, 15, 'Credit Card', 'Paid', 'Sample order'),
//   createData(12, 'TXN012', '2024-11-13', 'Nougat', 14, 4.5, 4, 60, 'Online Payment', 'Pending', 'Gift pack'),
//   createData(13, 'TXN013', '2024-11-13', 'Oreo', 18, 2.8, 3, 35, 'Debit Card', 'Paid', 'First time buyer'),
// ];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof number | string>(
//   order: Order,
//   orderBy: Key,
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string },
// ) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
//   headerWidth: number;
// }

// const headCells: readonly HeadCell[] = [
//   {
//     id: 'transID',
//     numeric: false,
//     disablePadding: false,
//     label: 'Trans. ID',
//     headerWidth: 120
//   },
//   {
//     id: 'date',
//     numeric: false,
//     disablePadding: false,
//     label: 'Date',
//     headerWidth: 110
//   },
//   {
//     id: 'itemDescription',
//     numeric: false,
//     disablePadding: false,
//     label: 'Item Description',
//     headerWidth: 200
//   },
//   {
//     id: 'quantity',
//     numeric: false,
//     disablePadding: false,
//     label: 'Quantity (Weight)',
//     headerWidth: 120
//   },
//   {
//     id: 'basePricePerUnit',
//     numeric: false,
//     disablePadding: false,
//     label: 'Base Price Per Unit',
//     headerWidth: 140
//   },
//   {
//     id: 'baseTotal',
//     numeric: false,
//     disablePadding: false,
//     label: 'Base Total',
//     headerWidth: 120
//   },
//   {
//     id: 'commissionValue',
//     numeric: false,
//     disablePadding: false,
//     label: 'Commission Value',
//     headerWidth: 120
//   },
//   {
//     id: 'totalPrice',
//     numeric: false,
//     disablePadding: false,
//     label: 'Total Price',
//     headerWidth: 135
//   },
//   {
//     id: 'amountPaid',
//     numeric: false,
//     disablePadding: false,
//     label: 'Amount Paid',
//     headerWidth: 150
//   },
//   {
//     id: 'balanceDue',
//     numeric: false,
//     disablePadding: false,
//     label: 'Balance Due',
//     headerWidth: 150
//   },
//   {
//     id: 'paymentMethod',
//     numeric: false,
//     disablePadding: false,
//     label: 'Payment Method',
//     headerWidth: 180
//   },
//   {
//     id: 'status',
//     numeric: false,
//     disablePadding: false,
//     label: 'Status',
//     headerWidth: 120
//   },
//   {
//     id: 'notes',
//     numeric: false,
//     disablePadding: false,
//     label: 'Notes',
//     headerWidth: 200
//   }
// ];

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const { order, orderBy, onRequestSort } =
//     props;
//   const createSortHandler =
//     (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <StyledTableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//             style={{minWidth: `${headCell.headerWidth}px`}}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </StyledTableCell >
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }



// const SecondaryTable = ({data}: {data: any[]}) => {
//   const [order, setOrder] = useState<Order>('asc');
//   const [orderBy, setOrderBy] = useState<keyof Data>('transID');
//   const [selected, setSelected] = useState<readonly number[]>([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleRequestSort = (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data,
//   ) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };



//   const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected: readonly number[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };


//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(() => {
//     return [...data]
//       .sort(getComparator(order, orderBy))
//       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   }, [data, order, orderBy, page, rowsPerPage]);
  
//   return (
//     <>
//       <Box sx={{ width: '100%' }} className="secondary-table">
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size="small"
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {visibleRows.map((row, index) => {
//                 const isItemSelected = selected.includes(row.id);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <StyledTableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.id)}
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.id}
//                     selected={isItemSelected}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     <StyledTableCell component="th" id={labelId} scope="row">
//                       {row.transID}
//                     </StyledTableCell>
//                     <StyledTableCell align="left">{row.date}</StyledTableCell>
//                     <StyledTableCell align="left">{row.itemDescription}</StyledTableCell>
//                     <StyledTableCell align="left">{row.quantity}</StyledTableCell>
//                     <StyledTableCell align="left">{row.basePricePerUnit}</StyledTableCell>
//                     <StyledTableCell align="left">{row.baseTotal}</StyledTableCell>
//                     <StyledTableCell align="left">{row.commissionValue}</StyledTableCell>
//                     <StyledTableCell align="left">{row.totalPrice}</StyledTableCell>
//                     <StyledTableCell align="left">{row.amountPaid}</StyledTableCell>
//                     <StyledTableCell align="left">{row.balanceDue}</StyledTableCell>
//                     <StyledTableCell align="left">{row.paymentMethod}</StyledTableCell>
//                     <StyledTableCell align="left">{row.status}</StyledTableCell>
//                     <StyledTableCell align="left">{row.notes}</StyledTableCell>
//                   </StyledTableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: 33 * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={13} />
//                 </TableRow>
//               )}
//             </TableBody>

//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Box>
//     </>
//   )
// }

// export default SecondaryTable






"use client";

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TableCell,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";

interface Data {
  transID: string;
  date: string;
  itemDescription: string;
  quantity: number;
  basePricePerUnit: number;
  baseTotal: number;
  commissionValue: number;
  totalPrice: number;
  amountPaid: number;
  balanceDue: number;
  paymentMethod: string;
  status: string;
  notes: string;
}

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Define order type for sorting
type Order = "asc" | "desc";

// Sorting helper functions
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const SecondaryTable = ({ data }: { data: Data[] }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("transID");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting logic
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Pagination logic
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate visible rows based on sorting and pagination
  const visibleRows = React.useMemo(
    () =>
      data
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, order, orderBy, page, rowsPerPage]
  );

  // Dynamic columns based on keys of the data
  const columns = Object.keys(data[0] || {}).map((key) => ({
    id: key as keyof Data,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()), // Convert camelCase to readable format
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((column) => (
                  <StyledTableCell key={column.id}>
                    {row[column.id] ?? "-"}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default SecondaryTable;
