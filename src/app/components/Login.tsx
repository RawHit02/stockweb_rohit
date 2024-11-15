// pages/login.js
import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box, Typography } from "@mui/material";
import { LoginSchema } from "@/yupSchema/LoginSchema";

const LoginPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log("Form data", values);
          // Handle form submission here, e.g., send data to API
        }}
      >
        {({ errors, touched, isSubmitting, handleChange, handleBlur }) => (
          <Form style={{ width: "100%", maxWidth: "400px" }}>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                type="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ padding: "10px" }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
