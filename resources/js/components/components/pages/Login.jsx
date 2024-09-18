import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button, TextField, Snackbar } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "25%",
    margin: "19px auto",
    backgroundColor: "#E6F4F1",
    borderRadius: "12px",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 25)",
  };
  const avatarStyle = { backgroundColor: "#D9D9D9" };
  const btnstyle = { backgroundColor: "#1B6DA1", margin: "12px 0" };
  const logoStyle = {
    backgroundColor: "#D9D9D9",
    margin: "10px 0",
    width: 70,
    height: 70,
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setSetMessage] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        values
      );
      localStorage.setItem("token", response.data.token);
      // resetForm();
      console.log("Login success:", response.data);
      setSetMessage('Login Sucessfully!');
      setOpenSnackbar(true);
      // navigate("/dashboard");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setSetMessage('Invalid Credentials!');
        setOpenSnackbar(true);
        setErrors({ email: error.response.data.message });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Grid>
      <Grid align="center">
        <Avatar style={logoStyle}>
          <LocationCityIcon
            style={{ color: "#002A57", width: 56, height: 56 }}
          />
        </Avatar>
        <h2>Viral Finder</h2>
      </Grid>

      <Paper elavation={12} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <ExitToAppRoundedIcon style={{ color: "#002A57" }} />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                name="email"
                variant="standard"
                placeholder="Enter Your Email"
                fullWidth
                required
                helperText={<ErrorMessage name="email" />}
                error={Boolean(<ErrorMessage name="email" />)}
              />

              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                variant="standard"
                placeholder="Enter Your Password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
                error={Boolean(<ErrorMessage name="password" />)}
              />

              <Button
                style={btnstyle}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default Login;
