"use client"
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { DeleteRed, DummyProfile, EditOutlinedIcon, MoreVertIcon } from '../assets';
import Image from 'next/image';

const ITEM_HEIGHT = 48;

interface Data {
    id: number;
    name: string;
    contact: number;
    whatsapp: number;
    address: number;
}


function createData(
    id: number,
    name: string,
    contact: number,
    whatsapp: number,
    address: number,
): Data {
    return {
        id,
        name,
        contact,
        whatsapp,
        address,
    };
}

const rows = [
    createData(1, 'Cupcake', 305, 3.7, 67),
    createData(2, 'Donut', 452, 25.0, 51),
    createData(3, 'Eclair', 262, 16.0, 24),
    createData(4, 'Frozen yoghurt', 159, 6.0, 24),
    createData(5, 'Gingerbread', 356, 16.0, 49),
    createData(6, 'Honeycomb', 408, 3.2, 87),
    createData(7, 'Ice cream sandwich', 237, 9.0, 37),
    createData(8, 'Jelly Bean', 375, 0.0, 94),
    createData(9, 'KitKat', 518, 26.0, 65),
    createData(10, 'Lollipop', 392, 0.2, 98),
    createData(11, 'Marshmallow', 318, 0, 81),
    createData(12, 'Nougat', 360, 19.0, 9),
    createData(13, 'Oreo', 437, 18.0, 63),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name/ Email',
    },
    {
        id: 'contact',
        numeric: false,
        disablePadding: false,
        label: 'Contact Number',
    },
    {
        id: 'whatsapp',
        numeric: false,
        disablePadding: false,
        label: 'WhatsApp Number',
    },
    {
        id: 'address',
        numeric: false,
        disablePadding: false,
        label: 'Address',
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell className='text-white' align='left'>
                    Action
                </TableCell>
            </TableRow>
        </TableHead>
    );
}



const PrimaryTableExample = () => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('contact');
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );
    return (
        <>
            <Box sx={{ width: '100%' }} className="primary-table">
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" >
                                            <Box className="flex items-center gap-[10px]">
                                                <Box className="w-[32px] h-[32px] rounded-full overflow-hidden">
                                                    <Image className='w-full h-full' src={DummyProfile} alt="img" />
                                                </Box>
                                                <Box>
                                                    <Typography className='text-sm'>{row.name}</Typography>
                                                    <Typography className='text-xs text-gray200'>test123@email.com</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">{row.contact}</TableCell>
                                        <TableCell align="left">{row.whatsapp}</TableCell>
                                        <TableCell align="left">{row.address}</TableCell>
                                        <TableCell align='left'>
                                            <Box>
                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClickMenu}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    id="long-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'long-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleCloseMenu}
                                                    slotProps={{
                                                        paper: {
                                                            style: {
                                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                                width: '126px',
                                                                boxShadow: "#9f9e9e29 5px 5px 16px 0px",
                                                                borderRadius: "8px"

                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem onClick={handleCloseMenu}>
                                                        <Box className="flex items-center gap-[6px] text-baseBlack">
                                                            <EditOutlinedIcon className='text-[20px]' />
                                                            <Typography className='text-sm'>Edit</Typography>
                                                        </Box>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleCloseMenu}>
                                                        <Box className="flex items-center gap-[6px] text-error200">
                                                            <Image src={DeleteRed} alt='delete' />
                                                            <Typography className='text-sm'>Delete</Typography>
                                                        </Box>
                                                    </MenuItem>
                                                </Menu>

                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    )
}

export default PrimaryTableExample