import { Box } from "@mui/material";
import Image from "next/image";
import { LoginBackground } from "./assets";

export default function Home() {
  return (
    <>
      <Box className="h-screen">
        <Image className="w-full h-full" src={LoginBackground} alt="login" />
      </Box>
    </>
  );
}
