import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button, TextField, Snackbar } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection


const Register = () => {
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
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        values
      );
      resetForm();
      console.log("Registration success:", response.data);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ email: error.response.data.message });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Grid>
      <Grid align="center">
        <Avatar style={logoStyle}>
          <LocationCityIcon style={{ color: "#002A57", width: 56, height: 56 }} />
        </Avatar>
        <h2>Viral Finder</h2>
      </Grid>

      <Paper elevation={12} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AppRegistrationIcon style={{ color: "#002A57" }} />
          </Avatar>
          <h2>Register</h2>
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
                label="First Name"
                name="firstName"
                variant="standard"
                placeholder="Enter Your First Name"
                fullWidth
                required
                helperText={<ErrorMessage name="firstName" />}
                error={Boolean(<ErrorMessage name="firstName" />)}
              />

              <Field
                as={TextField}
                label="Last Name"
                name="lastName"
                variant="standard"
                placeholder="Enter Your Last Name"
                fullWidth
                required
                helperText={<ErrorMessage name="lastName" />}
                error={Boolean(<ErrorMessage name="lastName" />)}
              />

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
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Registration successful! Redirecting to Login...
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default Register;
