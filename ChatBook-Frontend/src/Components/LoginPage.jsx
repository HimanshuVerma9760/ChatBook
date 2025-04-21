import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid2,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../utils/API/http";
import { toast, Toaster } from "react-hot-toast";
import { debounce } from "lodash";

export default function LoginPage() {
  const response = useActionData() || {};
  const message = response.message || "";
  const isAuth = response.isAuth || false;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/dashboard");
  }, [isAuth]);

  const smallScreen = useMediaQuery("(max-width:1050px)");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passType, setPassType] = useState("password");
  const [incompleteForm, setIncompleteForm] = useState(true);
  const redirect = debounce(() => {
    navigate("/dashboard");
  }, 2000);
  const { mutate } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      toast.dismiss();
      console.log("data.....", data);
      localStorage.setItem("token", data.token);
      toast.loading("Login successfull, please wait...", { duration: 1900 });
      redirect();
    },
    onError: (error) => {
      toast.dismiss();
      if (error.status === 401) {
        toast.error("Invalid email or password!", { duration: 2000 });
      } else {
        toast.error("Some error occured while logging in!", { duration: 2000 });
      }
    },
  });

  const [error, setError] = useState({
    emailError: {
      state: false,
      message: "",
    },
    passwordError: {
      state: false,
      message: "",
    },
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function onBlurHandler(event) {
    const id = event.target.id;
    const value = event.target.value;
    switch (id) {
      case "userEmail":
        if (value.trim().length === 0) {
          // !incompleteForm && setIncompleteForm(true);
          setError((prevState) => ({
            ...prevState,
            emailError: {
              state: true,
              message: "Empty Field",
            },
          }));
        } else {
          if (!isValidEmail(value)) {
            // !incompleteForm && setIncompleteForm(true);
            setError((prevState) => ({
              ...prevState,
              emailError: {
                state: true,
                message: "Invalid email",
              },
            }));
          }
        }
        break;
      case "userPassword":
        if (value.trim().length === 0) {
          // !incompleteForm && setIncompleteForm(true);
          setError((prevState) => ({
            ...prevState,
            passwordError: {
              state: true,
              message: "Empty Field",
            },
          }));
        }
        break;
    }
  }

  function onChangeHandler(event) {
    const id = event.target.id;
    const value = event.target.value;

    switch (id) {
      case "userEmail":
        if (error.emailError.state) {
          setError((prevState) => ({
            ...prevState,
            emailError: {
              value: false,
              message: "",
            },
          }));
        }
        setEmail(value);
        break;
      case "userPassword":
        if (error.passwordError.state) {
          setError((prevState) => ({
            ...prevState,
            passwordError: {
              value: false,
              message: "",
            },
          }));
        }
        setPassword(value);
        break;
      default:
        break;
    }
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    const loginCred = {
      email: email,
      password: password,
    };
    toast.promise(mutate({ loginCred }), {
      loading: "Logging in...",
    });
  }

  function togglePassword() {
    setPasswordVisible((prevState) => !prevState);
    setPassType((prevState) => (prevState === "text" ? "password" : "text"));
  }

  // function beforeSubmitHandler(event) {
  //   const emailValid = isValidEmail(email);
  //   const passwordValid = password.trim().length > 0;

  //   if (!emailValid || !passwordValid) {
  //     event.preventDefault();
  //     if (!emailValid) {
  //       setEmailError({ value: true, message: "Invalid Email" });
  //     }
  //     if (!passwordValid) {
  //       setPasswordError({ value: true, message: "Empty Field" });
  //     }
  //   }
  // }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        // alignItems="center"
        minHeight="100vh"
      >
        <Toaster />
        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: "5rem", sm: "3rem" },
            color: "#4B0082",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              width: { xs: "100%", sm: `${smallScreen ? "70" : "50%"}` },
            }}
          >
            <Grid2
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: "1.5rem", sm: "1rem" },
              }}
            >
              <Grid2>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: {
                      xs: "26px",
                      sm: `${smallScreen ? "38px" : "45px"}`,
                    },
                    fontWeight: "bold",
                  }}
                >
                  Welcome to ChatBook!
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: {
                      xs: "11.5px",
                      sm: `${smallScreen ? "15px" : "20px"}`,
                    },
                  }}
                >
                  We’re excited to have you back with us. Please login to get
                  started and explore all new features.
                </Typography>
              </Grid2>
              <Grid2
                display="flex"
                justifyContent="center"
                alignItems="baseline"
              >
                <Typography
                  variant="h5"
                  fontWeight={580}
                  sx={{
                    fontSize: {
                      sm: `${smallScreen ? "24px" : "32px"}`,
                      xs: "18px",
                    },
                  }}
                  align="center"
                >
                  Don't have an account?
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: {
                      xs: "13px",
                      sm: `${smallScreen ? "12px" : "15px"}`,
                    },
                    marginLeft: "0.5rem",
                  }}
                >
                  <Link to="/sign-up">Create Account</Link>
                </Typography>
              </Grid2>
              {/* {message && (
                <Typography variant="p" color="error">
                  {message}
                </Typography>
              )} */}
            </Grid2>
          </Box>
          <Box>
            <Grid2 alignItems="center" alignContent="center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Grid2 display="flex" flexDirection="column" gap="2rem">
                  <Grid2>
                    <Typography align="center">
                      <FormLabel
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        Log in
                      </FormLabel>
                    </Typography>
                  </Grid2>
                  <Grid2>
                    <Form onSubmit={onSubmitHandler}>
                      <Grid2
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          width: {
                            xs: "20rem",
                            sm: `${smallScreen ? "25rem" : "30rem"}`,
                          },
                        }}
                      >
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{ gap: "10px" }}
                        >
                          {/* <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Email
                        </label> */}
                          <TextField
                            autoFocus
                            onBlur={(event) => onBlurHandler(event)}
                            error={error.emailError.state}
                            autoComplete="off"
                            label={
                              error.emailError.state
                                ? error.emailError.message
                                : "Email"
                            }
                            type="email"
                            size="small"
                            id="userEmail"
                            value={email}
                            onChange={onChangeHandler}
                            name="userEmail"
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "8px",
                            }}
                          />
                        </FormControl>
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{ gap: "10px" }}
                        >
                          {/* <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Password
                        </label> */}
                          <TextField
                            size="small"
                            onBlur={(event) => onBlurHandler(event)}
                            autoComplete="off"
                            error={error.passwordError.state}
                            type={passType}
                            label={
                              error.passwordError.state
                                ? error.passwordError.message
                                : "Password"
                            }
                            value={password}
                            onChange={onChangeHandler}
                            id="userPassword"
                            name="userPassword"
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <IconButton onClick={togglePassword}>
                                    {!passwordVisible ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                ),
                              },
                            }}
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "8px",
                            }}
                          />
                        </FormControl>
                      </Grid2>
                      <Grid2 textAlign="center" marginTop="10px">
                        <Button
                          type="submit"
                          disabled={
                            error.emailError.state || error.passwordError.state
                          }
                        >
                          Submit
                        </Button>
                      </Grid2>
                    </Form>
                  </Grid2>
                </Grid2>
              </motion.div>
            </Grid2>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ marginTop: "2rem" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
