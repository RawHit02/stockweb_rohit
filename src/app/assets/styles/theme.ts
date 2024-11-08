"use client"

import { createTheme } from "@mui/material";

const theme = createTheme({
  typography:{
    h1:{
      fontSize:'25px',
      fontWeight:'bold'
    },
    h2:{
      fontSize:'23px',
      fontWeight:'bold'
    },
    h3:{
      fontSize:'18px',
      
    },
    h4:{
      fontSize:'16px',
      
    },
    h5:{
      fontSize:'14px',
    },
    h6:{
      fontSize:'13px',
      fontFamily:'sans-serif',
    },
    subtitle2:{
      fontSize:'15px',
      fontWeight:'bold'
    },
    subtitle1:{
      fontSize:'13px',
      fontWeight:'light'
    },
    body1:{
      fontSize:'13px',
      fontWeight:'light'
    },
    body2:{
      fontSize:'13px',
      fontWeight:'bold'
    },

  },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "uppercase",
                    boxShadow: "none",
                    borderRadius: "8px"
                },
            },
            variants: [
                {
                    props: { variant: "contained", color: "primary" },
                    style: {
                        backgroundColor: "#255435",
                        "&:hover": {
                            backgroundColor: "#255435"
                        }
                    },
                },
                {
                    props: { variant: "outlined" },
                    style: {
                        borderColor: "#245434",
                        color: "#092E20"
                    },
                },
                {
                    props: { size: "large" },
                    style: {
                        height: "40px",
                        padding: "0 12px"
                    },
                },
                {
                    props: { color: "secondary" },
                    style: {
                        color: "#000",
                    },
                },
            ],
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    height: "42px",
                    fontSize: "12px",
                    borderRadius: "8px",
                },
            },
            variants: [
                {
                    props: { color: "primary" },
                    style: {
                        color: "#4B7D47",
                        "&:hover": {
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4B7D47",
                            }
                        },
                        "&.Mui-focused": {
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4B7D47",
                            }
                        },
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4B7D47",
                        }
                    }
                },
                {
                    props: { color: "secondary" },
                    style: {
                        color: "#fff",
                        "&:hover": {
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff",
                            }
                        },
                        "&.Mui-focused": {
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff",
                            }
                        },
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "#fff",
                        }
                    }
                },
                {
                    props: { size: "medium" },
                    style: {
                        height: "46px",
                        fontSize: "14px",
                    }
                }
            ]
        },
        MuiDialog: {
            variants: [
                {
                    props: { maxWidth: "sm" },
                    style: {
                        ".MuiPaper-root": {
                            maxWidth: "520px",
                        },
                    },
                },
            ],
        },
        MuiLink:{
          styleOverrides: {
            root: {
              textDecoration:'none',
              color:'black',
          },
          },
        },
    },
});

export default theme