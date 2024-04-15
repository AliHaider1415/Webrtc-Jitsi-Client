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
import countries from "../utils/countries";
import { SignUpSchema } from "../utils/Schemas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("JobSeeker");

  const showToastMessage = (message) => {
    console.log(message);
    if (message.error) {
      toast.error(message.error, {});
    } else {
      toast.success("Your account has been created successfully", {});
      localStorage.setItem("access", message.access);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const changeForm = (value) => {
    setActiveForm(value);
  };

  const signUpMutation = useMutation(async (values) => {
    let apiUrl;
    switch (activeForm) {
      case "Employer":
        apiUrl = "http://127.0.0.1:8000/company/company-signup";
        break;
      case "JobSeeker":
        apiUrl = "http://127.0.0.1:8000/candidates/user-signup";
        break;
      case "Trainer":
        apiUrl = "http://127.0.0.1:8000/candidates/user-signup";
        break;
      default:
        break;
    }

    console.log(activeForm);
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        phone: values.phone,
        password: values.password,
        country: values.country,
        is_candidate: activeForm === "JobSeeker",
        is_employer: activeForm === "Employer",
        is_trainer: activeForm === "Trainer",
      }),
    });

    const json = await response.json();
    return json;
  });

  const handleSignUp = async (values) => {
    try {
      const data = await signUpMutation.mutateAsync(values);
      showToastMessage(data);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while signing up");
    }
  };

  return (
    <div>
      {" "}
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          country: "",
          phone: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          handleSignUp(values);
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
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Company Name"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name}
                            helperText={
                              errors.name && touched.name && errors.name
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
                          type="tel"
                          label="Contact Number"
                          name="phone"
                          autoComplete="tel"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          error={errors.phone && touched.phone}
                          helperText={
                            errors.phone && touched.phone && errors.phone
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
                            errors.password &&
                            touched.password &&
                            errors.password
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
                  <ToastContainer />
                </Box>
              </Container>
            </ThemeProvider>
          </Form>
        )}
      </Formik>
    </div>
  );
}
