import * as React from "react";
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
import { LoginSchema } from "../utils/Schemas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const showToastMessage = (message) => {
    console.log(message);
    if (message.error) {
      toast.error(message.error, {});
    } else {
      toast.success(message.message, {});
      localStorage.setItem("access", message.access);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const loginMutation = useMutation(async (values) => {
    const response = await fetch("http://127.0.0.1:8000/accounts/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    const json = await response.json();
    return json;
  });

  const handleLogin = async (values) => {
    try {
      const data = await loginMutation.mutateAsync(values);
      showToastMessage(data);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleLogin(values);
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
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    padding: 3,
                    borderRadius: 1,
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={errors.email && touched.email}
                      helperText={errors.email && touched.email && errors.email}
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password && touched.password}
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit}
                      disabled={loginMutation.isLoading}
                    >
                      {loginMutation.isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/sign-up" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Container>
            </ThemeProvider>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}
