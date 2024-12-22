"use client"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react'
import { CheckCircleIcon, CurrencyRupee } from '../assets';
import Image from 'next/image';

interface UpdatePriceProps {
    title: string;
}

const UpdatePriceDialog: FC <UpdatePriceProps> = ({ title }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Typography className="mt-4 text-[#1085B7] cursor-pointer" onClick={handleClickOpen}>Update</Typography>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <Box className="p-6">
                    <Typography className='text-[16px] font-normal'>{title}</Typography>
                    <Typography className='text-secondary800 text-[12px] mt-2'>Add or update price</Typography>
                    <Box className="mt-4">
                        <Box>
                            <Typography className="text-primary text-[12px]">Commodity Price for Buyer</Typography>
                            <OutlinedInput
                                color='primary'
                                startAdornment={<InputAdornment position="start"><Image src={CurrencyRupee} alt='rupee' /></InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                placeholder='Enter Here'
                                fullWidth
                                className='mt-1'
                            />
                        </Box>
                        <Box className="mt-4">
                            <Typography className="text-primary text-[12px]">Commodity Commission</Typography>
                            <OutlinedInput
                                color='primary'
                                startAdornment={<InputAdornment position="start"><Image src={CurrencyRupee} alt='rupee' /></InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                placeholder='Enter Here'
                                fullWidth
                                className='mt-1'
                            />
                        </Box>
                    </Box>
                    <Button
                        variant='contained'
                        color='primary'
                        className='w-full mt-5 h-10'
                        startIcon={<CheckCircleIcon className='text-wwhite' />}>
                        Update
                    </Button>
                </Box>
            </Dialog>
        </>
    )
}

export default UpdatePriceDialog