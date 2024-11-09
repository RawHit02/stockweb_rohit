"use client"
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { AddCircleOutlineOutlinedIcon, CheckCircleIcon, CloseOutlinedIcon, FileUploadOutlinedIcon, UploadImageIcon } from '../assets';
import { Box, Input, InputAdornment, OutlinedInput } from '@mui/material';
import Image from 'next/image';

const AddNewBuyerDialog = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button variant='contained' className='bg-primaryLight rounded-lg h-10 text-base' startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleClickOpen}>ADD BUYER</Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="sm"
            >
                <DialogTitle className='flex items-start justify-between px-9 pt-9 pb-6'>
                    <Box>
                        
                        <Typography className='text-2xl leading-6 font-semibold'>Add New Buyer</Typography>
                        <Typography className='text-secondary800 mt-2'>Enter details of your Vendor</Typography>

                    </Box>
                    <IconButton onClick={handleClose} className='p-0'>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className='px-9'>
                    <Box className="flex items-center gap-6">
                        <Box className="border-[6px] border-primary200 bg-primaryExtraLight rounded-full overflow-hidden w-[120px] h-[120px] flex items-center justify-center relative">
                            {/* Hide this image when user upload the image */}
                            <Image src={UploadImageIcon} alt="upload" />
                            <Input type='file' className='absolute opacity-0' />
                            {/* Show this below image when user upload it */}
                            {/* <Image width={100} height={100} className='w-full h-full' src="" alt='' /> */}
                        </Box>
                        <Box>
                            <Box className="flex items-center gap-2">
                                <Button variant='outlined' size='large' startIcon={<FileUploadOutlinedIcon />}>Upload</Button>
                                <Button variant='outlined' size='large' startIcon={<CloseOutlinedIcon />}>Reset</Button>
                            </Box>
                            <Typography className='text-[12px] text-[#92929D] mt-2'>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
                        </Box>
                    </Box>
                    <Box className="flex flex-col w-full gap-3 mt-3">
                        <Box>
                            <Typography className='text-sm text-primary'>Name</Typography>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                color='primary'
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                size='medium'
                                fullWidth
                                className='mt-1'
                                placeholder='Enter here'
                            />
                        </Box>
                        <Box>
                            <Typography className='text-sm text-primary'>Contact Number</Typography>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                color='primary'
                                startAdornment={<InputAdornment position="start"><Typography className='text-secondary800 text-sm'>+1</Typography></InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                size='medium'
                                fullWidth
                                className='mt-1'
                            />
                        </Box>
                        <Box>
                            <Typography className='text-sm text-primary'>WhatsApp Number</Typography>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                color='primary'
                                startAdornment={<InputAdornment position="start"><Typography className='text-secondary800 text-sm'>+1</Typography></InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                size='medium'
                                fullWidth
                                className='mt-1'
                            />
                        </Box>
                        <Box>
                            <Typography className='text-sm text-primary'>Email</Typography>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                type='email'
                                color='primary'
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                size='medium'
                                fullWidth
                                className='mt-1'
                            />
                        </Box>
                        <Box>
                            <Typography className='text-sm text-primary'>Address</Typography>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                color='primary'
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                size='medium'
                                fullWidth
                                className='mt-1'
                                placeholder='Enter address here'
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions className='mb-[36px] px-9'>
                    <Button variant='outlined' size='large' startIcon={<CloseOutlinedIcon />}>Reset</Button>
                    <Button variant='contained' color='primary' size='large' startIcon={<CheckCircleIcon className="text-[20px]" />} onClick={handleClose}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddNewBuyerDialog