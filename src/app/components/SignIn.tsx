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
import { apiClient } from "@/base-url/apiClient";
import { SIGN_IN } from "@/base-url/apiRoutes";
import Link from "next/link";


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleLogin = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      // Use direct axios for login since we don't have a token yet
      // The SIGN_IN URL is relative now
      const response = await apiClient.post(SIGN_IN, {
        email: values.email,
        password: values.password,
      });


      if (response.data.statusCode === 200) {
        const { accessToken, refreshToken } = response.data.data;

        // Set tokens in cookies and localStorage
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        document.cookie = `authToken=${accessToken}; path=/; secure; samesite=strict; expires=${new Date(
          Date.now() + 60 * 60 * 1000 // 1-hour
        ).toUTCString()};`;

        // Dispatch action for login
        dispatch(login());

        // Force a page reload or router push to dashboard
        router.push("/dashboard");
      } else {
        alert(response.data.message || "Invalid email or password");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Invalid email or password";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            <Typography className="mt-2 text-gray-500">
              Enter your credentials for login
            </Typography>
          </Box>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form>
                <Box className="mt-6">
                  <Typography className="text-primary font-medium mb-1">Email</Typography>
                  <Field
                    as={OutlinedInput}
                    name="email"
                    placeholder="Enter your email"
                    fullWidth
                    className="mt-1"
                    error={touched.email && Boolean(errors.email)}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-[12px] mt-1"
                  />
                </Box>
                <Box className="mt-6">
                  <Typography className="text-primary font-medium mb-1">Password</Typography>
                  <Field
                    as={OutlinedInput}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                    className="text-red-600 text-[12px] mt-1"
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  className="w-full mt-6 h-[47px] bg-primary hover:bg-primary-dark transition-all"
                  disabled={loading}
                  sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form>
            )}
          </Formik>

          <Box className="mt-6 flex flex-col gap-4">
            <Box className="flex items-center justify-between">
              <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography className="text-primary font-medium hover:underline cursor-pointer">
                  FORGOT PASSWORD
                </Typography>
              </Link>
              <ArrowForwardIosOutlinedIcon className="text-sm text-[#090A0B]" />
            </Box>
            
            <Box className="text-center pt-4 border-t border-gray-100">
              <Typography className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" style={{ textDecoration: 'none' }}>
                  <span className="text-primary font-bold hover:underline cursor-pointer">
                    Sign Up
                  </span>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;

