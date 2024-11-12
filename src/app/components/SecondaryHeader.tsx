import { Box, Button, InputAdornment, OutlinedInput, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { EditOutlinedIcon, NotificationIcon, SearchIcon } from '../assets'
import { ArrowBack } from '@mui/icons-material'

const SecondaryHeader = () => {
    return (
        <Box className='bg-white border border-secondary rounded-[12px] flex w-full justify-between items-center py-4 ps-6 pr-[18px] h-[72px]'>
            <Box className="flex items-center gap-[10px]">
                <Box className="rounded-full border border-gray300 w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
                    <ArrowBack className='text-base' />
                </Box>
                <Typography className='text-2xl font-bold'>Flores Juanita</Typography>
            </Box>
            <Button variant='outlined' startIcon={<EditOutlinedIcon />} size='large' className='text-base'>Edit</Button>
        </Box>
    )
}

export default SecondaryHeader