import { Box, IconButton, InputAdornment, Menu, MenuItem, OutlinedInput, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { NotificationIcon, HeaderSearchIcon, NotificationItemIcon, CancelOutlinedIcon, CloseOutlinedIcon } from '../assets'

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box className='bg-primary rounded-[12px] flex w-full justify-between items-center py-4 ps-6 pr-[18px] h-[72px]'>
        <Box className="max-w-[372px] w-full">
          <OutlinedInput
            id="outlined-adornment-weight"
            color='secondary'
            startAdornment={<InputAdornment position="start"><Image src={HeaderSearchIcon} alt='search' /></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            placeholder='Search anything'
            fullWidth
          />
        </Box>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Image src={NotificationIcon} alt='notify' />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className='notification-menu'
        >
          <Box className="flex items-center justify-between px-4">
            <Typography className='text-2xl font-semibold'>Notification</Typography>
            <Typography className='text-[12px] text-primary cursor-pointer'>Mark All as read</Typography>
          </Box>
          <Box className="mt-4 px-[10px] flex flex-col gap-2">
            <Box className="border border-gray300 rounded-2xl w-full px-[10px] py-2 flex items-start justify-between">
              <Box className="flex items-start gap-[10px]">
                <Box>
                  <Image src={NotificationItemIcon} alt='notify' />
                </Box>
                <Box>
                  <Typography className='text-primary text-base leading-none'>Stock Running Low!</Typography>
                  <Typography className='text-secondary800 text-[12px] mt-1'>Please restock immediately to avoid delays in operations.</Typography>
                  <Typography className='text-[10px] mt-[5px]'>20 min ago</Typography>
                </Box>
              </Box>
              <CloseOutlinedIcon className='text-[14px] text-gray100 cursor-pointer' />
            </Box>
            <Box className="border border-gray300 rounded-2xl w-full px-[10px] py-2 flex items-start justify-between">
              <Box className="flex items-start gap-[10px]">
                <Box>
                  <Image src={NotificationItemIcon} alt='notify' />
                </Box>
                <Box>
                  <Typography className='text-primary text-base leading-none'>Stock Running Low!</Typography>
                  <Typography className='text-secondary800 text-[12px] mt-1'>Please restock immediately to avoid delays in operations.</Typography>
                  <Typography className='text-[10px] mt-[5px]'>20 min ago</Typography>
                </Box>
              </Box>
              <CloseOutlinedIcon className='text-[14px] text-gray100 cursor-pointer' />
            </Box>
          </Box>
        </Menu>
      </Box>
    </>
  )
}

export default Header