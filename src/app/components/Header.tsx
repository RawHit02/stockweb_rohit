import { Box, InputAdornment, OutlinedInput} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { NotificationIcon, SearchIcon } from '../assets'

const Header = () => {
  return (
    <>
      <Box className='bg-primary rounded-[12px] flex w-full justify-between items-center py-4 ps-6 pr-[18px] h-[72px]'>
        <Box className="max-w-[372px] w-full">
          <OutlinedInput
            id="outlined-adornment-weight"
            color='secondary'
            startAdornment={<InputAdornment position="start"><Image src={SearchIcon} alt='search' /></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            placeholder='Search anything'
            fullWidth
          />
        </Box>
        <Box><Image src={NotificationIcon} alt='notify' /></Box>
      </Box>
    </>
  )
}

export default Header