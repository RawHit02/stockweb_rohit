import { Box } from '@mui/material'
import React from 'react'
import { Hamburger, Logo1 } from '../assets'
import Image from 'next/image'

const SideNav = () => {
  return (
    <>
      <Box className="w-full bg-primary h-[calc(100vh-32px)] rounded-xl px-4 pt-9">
        <Box className="flex items-center justify-between">
          <Box>
            <Image src={Logo1} alt="logo" />
          </Box>
          <Box className="cursor-pointer">
            <Image src={Hamburger} alt="logo" />
          </Box>
        </Box>

      </Box>
    </>
  )
}

export default SideNav