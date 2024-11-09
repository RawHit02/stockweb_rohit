"use client"
import React, { useState } from "react";
import { Box, Button, Typography, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Image from "next/image";
import { ArrowForwardIosOutlinedIcon, ArrowRightIcon, Logo2, RemoveRedEyeOutlinedIcon, VisibilityOffOutlinedIcon } from "../assets";
import Link from "next/link";
import { LoginBackground } from "../assets";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <Box className='relative h-screen w-full' >
            <Box className="absolute z-[-1] w-full h-full top-0 left-0">
                <Image className="w-full h-full" src={LoginBackground} alt="login" />
            </Box>
            <Box className="flex items-center justify-center w-full h-full">
                <Box className="bg-white rounded-3xl max-w-[492px] w-full pt-[61px] px-[42px] pb-[42px]">
                    <Box>
                        <Image src={Logo2} alt="logo" />
                    </Box>
                    <Box className="mt-10">
                        <Typography className="text-2xl font-bold leading-6">LOGIN</Typography>
                        <Typography className="mt-2">Enter your credentials for login</Typography>
                    </Box>
                    <Box className="mt-6">
                        <Box>
                            <Typography className="text-primary">Username</Typography>
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
                        <Box className="mt-6">
                            <Typography className="text-primary">Username</Typography>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter here"
                                size="medium"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffOutlinedIcon className="text-gray100" /> : <RemoveRedEyeOutlinedIcon className="text-gray100" />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                fullWidth
                            />
                        </Box>
                    </Box>
                    <Button variant="contained" className="w-full mt-6 h-[47px]">Login</Button>
                    <Box className="flex items-center justify-between mt-9">
                        <Link href="#" className="text-primary font-medium">FORGOT PASSWORD</Link>
                        <ArrowForwardIosOutlinedIcon className="text-sm text-[#090A0B]" />
                    </Box>
                </Box>
            </Box>

            {/* <Box className="flex items-center justify-center w-full h-screen">
      <Box className="max-w-[492px] w-full bg-white rounded-2xl pt-[61px] pl-[42px] pr-[42px] pb-[42px] flex flex-col gap-[24px]">
        <Box className="  flex flex-row items-center gap-2">
          <Image src={logo} alt="img" />
          <Typography variant='h1'>STOCKS</Typography>
        </Box>
        <Box>
          <Typography variant="h2">LOGIN</Typography>
          <Typography variant="body1">Enter your credentials for login</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Username</Typography>
          <TextField placeholder="Enter here" variant="outlined" size='small' className="w-full" ></TextField>
        </Box>
        <Box>
          <Typography variant="subtitle1">Password</Typography>
          <OutlinedInput placeholder="Enter here" size="small" className="w-full"
            endAdornment={
              <InputAdornment position="end">
                <IconButton className="text-black">
                  <VisibilityIcon />
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </Box>
        <Box>
          <Button variant='contained' size="medium" className=" w-full py-2">
            <Typography variant="h5" className="text-white">LOGIN</Typography>
          </Button>
        </Box>
        <Box >
          <Link href='#' className="w-full flex items-center justify-between" >
            <Typography variant="h5"> FORGOT PASSWORD</Typography>
            <KeyboardArrowRightIcon />
          </Link>
        </Box>
      </Box>
    </Box> */}
        </Box>
    )
}

export default SignIn