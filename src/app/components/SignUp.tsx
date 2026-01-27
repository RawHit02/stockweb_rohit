// src/components/SignUp.tsx
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";

import {
  RemoveRedEyeOutlinedIcon,
  VisibilityOffOutlinedIcon,
  Logo2,
  LoginBackground,
} from "../assets";
import { apiClient } from "@/base-url/apiClient";
import { CREATE_USER } from "@/base-url/apiRoutes";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    phoneNumber: Yup.string().required("Please enter your phone number"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Please enter your password"),
  });

  const handleSignUp = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        role: "a58125bf-f933-445e-af65-873708d98e03", // Default role from user request
      };

      const response = await apiClient.post(CREATE_USER, payload);


      if (response.data.statusCode === 201 || response.data.statusCode === 200) {
        alert("Account created successfully! Please login.");
        router.push("/");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
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
        <Box className="bg-white rounded-3xl max-w-[492px] w-full mt-10 mb-10 pt-[40px] px-[42px] pb-[40px] overflow-y-auto max-h-[90vh]">
          <Box className="flex justify-center">
            <Image src={Logo2} alt="logo" />
          </Box>
          <Box className="mt-8 text-center">
            <Typography className="text-2xl font-bold leading-6">
              SIGN UP
            </Typography>
            <Typography className="mt-2 text-gray-500">
              Create your account to get started
            </Typography>
          </Box>

          <Formik
            initialValues={{ name: "", email: "", phoneNumber: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ errors, touched }) => (
              <Form>
                <Box className="mt-6">
                  <Typography className="text-primary font-medium mb-1">Full Name</Typography>
                  <Field
                    as={OutlinedInput}
                    name="name"
                    placeholder="Enter your name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                  />
                  <ErrorMessage name="name" component="div" className="text-red-600 text-[12px] mt-1" />
                </Box>

                <Box className="mt-4">
                  <Typography className="text-primary font-medium mb-1">Email</Typography>
                  <Field
                    as={OutlinedInput}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-[12px] mt-1" />
                </Box>

                <Box className="mt-4">
                  <Typography className="text-primary font-medium mb-1">Phone Number</Typography>
                  <Field
                    as={OutlinedInput}
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    fullWidth
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-600 text-[12px] mt-1" />
                </Box>

                <Box className="mt-4">
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
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-[12px] mt-1" />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  className="w-full mt-6 h-[47px] bg-primary font-bold"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </Form>
            )}
          </Formik>

          <Box className="text-center mt-6 pt-4 border-t border-gray-100">
            <Typography className="text-gray-600">
              Already have an account?{" "}
              <Link href="/" style={{ textDecoration: 'none' }}>
                <span className="text-primary font-bold hover:underline cursor-pointer">
                  Login
                </span>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
