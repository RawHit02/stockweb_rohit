"use client"

import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "uppercase",
                    boxShadow: "none",
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
                        borderColor: "#092E20",
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
    },
});

export default theme