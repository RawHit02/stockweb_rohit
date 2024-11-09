import React from 'react'
import { Box, Typography } from '@mui/material'
import { AddNewBuyerDialog, PrimaryTable } from '@/app/components'

const Buyers = () => {
    return (
        <>
            <Box className="bg-white border border-[#E8EBED] rounded-xl p-6">
                <Box className="w-full flex items-center justify-between">
                    <Typography className='text-2xl font-bold'>Vendor Management / Buyers</Typography>
                    <AddNewBuyerDialog />
                </Box>
                <Box className="mt-4">
                    <PrimaryTable />
                </Box>
            </Box>

        </>
    )
}

export default Buyers