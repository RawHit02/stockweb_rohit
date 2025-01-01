// src/components/SignIn.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  RemoveRedEyeOutlinedIcon,
  VisibilityOffOutlinedIcon,
  ArrowForwardIosOutlinedIcon,
} from "../assets";
import Image from "next/image";
import { Logo2, LoginBackground } from "../assets";
import { login } from "@/redux/slices/authSlice";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    const { username, password } = values;

    // Commented out middleware-related code
    
    try {
      // Mock login logic
      if (username === "admin" && password === "password") {
        const mockData = { token: "mockedAuthToken" };

        // Set authToken in cookies
        document.cookie = `authToken=${
          mockData.token
        }; path=/; secure; expires=${new Date(
          Date.now() + 60 * 60 * 1000 // 1-hour 
        ).toUTCString()};`;

        // Dispatch action for login
        dispatch(login());

        router.push("/dashboard");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
    
   }; 

  //   if (username === "admin" && password === "password") {
  //     // Mock token
  //     const mockData = { token: "mockedAuthToken" };

  //     // Set authToken in cookies
  //     document.cookie = `authToken=${mockData.token}; path=/; secure; expires=${new Date(
  //       Date.now() + 60 * 60 * 1000 // 1-hour
  //     ).toUTCString()};`;

  //     // Dispatch action for login
  //     dispatch(login());

  //     // Navigate to dashboard
  //     router.push("/dashboard");
  //   } else {
  //     alert("Invalid username or password");
  //   }
  // };

  return (
    <Box className="relative h-screen w-full">
      <Box className="absolute z-[-1] w-full h-full top-0 left-0">
        <Image className="w-full h-full" src={LoginBackground} alt="login" />
      </Box>
      <Box className="flex items-center justify-center w-full h-full">
        <Box className="bg-white rounded-3xl max-w-[492px] w-full pt-[61px] px-[42px] pb-[42px]">
          <Box>
            <Image src={Logo2} alt="logo" />
          </Box>
          <Box className="mt-10">
            <Typography className="text-2xl font-bold leading-6">
              LOGIN
            </Typography>
            <Typography className="mt-2">
              Enter your credentials for login
            </Typography>
          </Box>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form>
                <Box className="mt-6">
                  <Typography className="text-primary">Username</Typography>
                  <Field
                    as={OutlinedInput}
                    name="username"
                    placeholder="Enter here"
                    fullWidth
                    className="mt-1"
                    error={touched.username && Boolean(errors.username)}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-600 text-[12px]"
                  />
                </Box>
                <Box className="mt-6">
                  <Typography className="text-primary">Password</Typography>
                  <Field
                    as={OutlinedInput}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter here"
                    fullWidth
                    error={touched.password && Boolean(errors.password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <RemoveRedEyeOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-[12px]"
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  className="w-full mt-6 h-[47px]"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          <Box className="flex items-center justify-between mt-9">
            <Typography className="text-primary font-medium">
              FORGOT PASSWORD
            </Typography>
            <ArrowForwardIosOutlinedIcon className="text-sm text-[#090A0B]" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
