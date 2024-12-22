"use client"

import { Padding, RoundedCorner } from "@mui/icons-material";
import { createTheme } from "@mui/material";

const theme = createTheme({
    palette:{
        primary:{
            main:'rgba(75, 125, 71, 1)',
        }
    },
    components: {
        MuiTextField:{
            styleOverrides:{
                root:{
                    placeholder:{
                        fontSize: '14px',
                        fontFamily:'Poppins',
                        fontWeight: '400',
                        color:'#4B7D47',
                    },
                },
            },
        },
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
                    props: { maxWidth: "xs" },
                    style: {
                        ".MuiPaper-root": {
                            maxWidth: "272px",
                        },
                    },
                },
                {
                    props: { maxWidth: "sm" },
                    style: {
                        ".MuiPaper-root": {
                            maxWidth: "520px",
                        },
                    },
                },
                {
                    props: { maxWidth: "lg" },
                    style: {
                        ".MuiPaper-root": {
                            maxWidth: "665px",
                        },
                    },
                },
            ],
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'black',
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    "&.primary-switch": {
                        "&.MuiSwitch-root": {
                            padding: 0,
                            borderRadius: "55px",
                            width: "48px",
                            height: "24px",
                            ".MuiSwitch-track": {
                                backgroundColor: "#DEDEDE",
                                opacity: 1
                            },
                            ".MuiSwitch-switchBase": {
                                padding: " 0 0 0 4px",
                                "&.Mui-checked": {
                                    ".MuiSwitch-thumb": {
                                        backgroundColor: "#FFF"
                                    },
                                },
                                ".MuiSwitch-thumb": {
                                    marginTop: "2px",
                                    backgroundColor: "#0B7B69"
                                },
                                "&.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: "#E4626F"
                                }
                            }
                        }
                    }
                }
            },
        },
    },
});

export default theme