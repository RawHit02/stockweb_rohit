import { Box ,Button, Paper, TextField, Typography, Link, IconButton,InputAdornment, OutlinedInput } from "@mui/material";
import Image from "next/image";
import {logo} from "./assets";
import { LoginBackground } from "./assets";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Home() {
  return (
    <Box className='relative' >
      <Box className="h-screen">
        <Image className="w-full h-full" src={LoginBackground} alt="login" />
      </Box>
      <Paper className="max-w-[492px] w-full absolute top-20 left-1/3 rounded-2xl pt-[42px] pl-[42px] pr-[42px] pb-[42px] flex flex-col gap-[24px]">
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
            <VisibilityIcon/>
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
          <KeyboardArrowRightIcon/>
           </Link>
         </Box>
      </Paper>
    </Box>
  );
}
