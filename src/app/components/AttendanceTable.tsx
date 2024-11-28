"use client"
import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CancelOutlinedIcon, CheckCircleOutlineIcon, PanoramaFishEyeIcon, StarIcon } from '../assets';
import Image from 'next/image';

const AttendanceTable = () => {
    const headings = Array.from({ length: 30 }, (_, i) => i + 1);

    const [age, setAge] = useState('10');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    return (
        <>
            <Box sx={{ width: '100%' }} className="primary-table-attendance">
                <TableContainer className="primary-table">
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {headings.map((number) => (
                                    <TableCell key={number} align="center">
                                        {number}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {headings.map((number) => (
                                <TableRow
                                    key={number}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {headings.map((heading, index) => (
                                        <TableCell key={heading} align="center">
                                            <Box className="attendance-select">
                                                {((index + 1) % 7 === 0) ? ( // Check if the column is the 7th
                                                    <Image src={StarIcon} alt='star' width={20} className='min-w-[20px]' />
                                                ) : (
                                                    <Select
                                                        labelId="demo-select-small-label"
                                                        id="demo-select-small"
                                                        value={age}
                                                        onChange={handleChange}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value={10}>
                                                            <PanoramaFishEyeIcon className='text-[22px] text-primary200' />
                                                        </MenuItem>
                                                        <MenuItem value={20}>
                                                            <CheckCircleOutlineIcon className='text-[22px] text-primary500' />
                                                        </MenuItem>
                                                        <MenuItem value={30}>
                                                            <CancelOutlinedIcon className='text-[22px] text-red100' />
                                                        </MenuItem>
                                                    </Select>
                                                )}
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default AttendanceTable