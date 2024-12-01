"use client";
import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className="flex flex-col">
          <Typography
            component="div"
            className="text-[#000000] flex flex-row self-center text-xs font-normal"
          >
            79%
          </Typography>
          <Typography
            component="div"
            className="text-[#000000] flex flex-row self-center text-xs font-normal"
          >
            Present
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function TotalPresentPercentage() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgressWithLabel
      value={79}
      size="88px"
      className="text-[#092E20]"
    />
  );
}
