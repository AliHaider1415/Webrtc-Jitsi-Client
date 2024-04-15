import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form } from "formik";
import CountrySelect from "./CountrySelect";
import countries from "../data/countries";
import { SignUpSchema } from "../utils/Schemas";
const theme = createTheme();

export default function SignUp() {
  const [activeForm, setActiveForm] = useState("JobSeeker");

  const changeForm = (value) => {
    setActiveForm(value);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
        companyName: "",
        country: "",
        contactNumber: "",
        activeForm: "JobSeeker",
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: theme.spacing(3),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "background.paper",
                  boxShadow: theme.shadows[3],
                  borderRadius: theme.shape.borderRadius,
                  padding: theme.spacing(3),
                }}
              >
                <Typography component="h6" variant="h6">
                  Create {activeForm} Account
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant={
                        activeForm === "JobSeeker" ? "contained" : "outlined"
                      }
                      onClick={() => changeForm("JobSeeker")}
                    >
                      JobSeeker
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant={
                        activeForm === "Employer" ? "contained" : "outlined"
                      }
                      onClick={() => changeForm("Employer")}
                    >
                      Employer
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant={
                        activeForm === "Trainer" ? "contained" : "outlined"
                      }
                      onClick={() => changeForm("Trainer")}
                    >
                      Trainer
                    </Button>
                  </Grid>
                </Grid>
                <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {activeForm === "Employer" ? (
                        <TextField
                          autoComplete="given-name"
                          name="companyName"
                          required
                          fullWidth
                          id="companyName"
                          label="Company Name"
                          autoFocus
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.companyName}
                          error={errors.companyName && touched.companyName}
                          helperText={
                            errors.companyName &&
                            touched.companyName &&
                            errors.companyName
                          }
                        />
                      ) : (
                        <TextField
                          autoComplete="given-name"
                          name="name"
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          autoFocus
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          error={errors.name && touched.name}
                          helperText={
                            errors.name && touched.name && errors.name
                          }
                        />
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <CountrySelect
                        countries={countries}
                        id="country"
                        name="country"
                        label="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        error={errors.country && touched.country}
                        helperText={
                          errors.country && touched.country && errors.country
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={errors.email && touched.email}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="phone"
                        label="Contact Number"
                        type="number"
                        name="contactNumber"
                        autoComplete="tel"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contactNumber}
                        error={errors.contactNumber && touched.contactNumber}
                        helperText={
                          errors.contactNumber &&
                          touched.contactNumber &&
                          errors.contactNumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={errors.password && touched.password}
                        helperText={
                          errors.password && touched.password && errors.password
                        }
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: theme.spacing(3), mb: theme.spacing(2) }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Container>
          </ThemeProvider>
        </Form>
      )}
    </Formik>
  );
}
