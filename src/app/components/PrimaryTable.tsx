// components/PrimaryTable.tsx
"use client";

import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
// import { visuallyHidden } from "@mui/utils";
import Image from "next/image";
import { Data } from "@/types/types";

interface PrimaryTableProps {
    rows: Data[];
}

const PrimaryTable: React.FC<PrimaryTableProps> = ({ rows }) => {
    const columns = [
        { id: "name", label: "Name/Email" },
        { id: "contactNumber", label: "Contact Number" },
        { id: "whatsappNumber", label: "WhatsApp Number" },
        { id: "address", label: "Address" },
    ];

    return (
        <Box sx={{ width: "100%" }} className="primary-table">
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    <TableSortLabel>
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover key={row.id}>
                                <TableCell>
                                    <Box className="flex items-center gap-2">
                                        <Image
                                            src={row.profileImage || '/path/to/default-image.jpg'}
                                            alt={`${row.name}'s profile`}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <Box>
                                            <Typography className="text-sm font-medium">{row.name}</Typography>
                                            <Typography className="text-xs text-gray-500">{row.email}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="left">{row.contactNumber}</TableCell>
                                <TableCell align="left">{row.whatsappNumber}</TableCell>
                                <TableCell align="left">{row.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PrimaryTable;
