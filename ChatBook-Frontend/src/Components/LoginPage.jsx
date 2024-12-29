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
import { Form, Link, useActionData } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const response = useActionData() || {};
  const message = response.message || "";

  const smallScreen = useMediaQuery("(max-width:1050px)");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passType, setPassType] = useState("password");
  const [incompleteForm, setIncompleteForm] = useState(true);

  const [emailError, setEmailError] = useState({
    value: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    value: false,
    message: "",
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function checkInputValidity(inputValue, inputType) {
    switch (inputType) {
      case "email":
        if (inputValue.trim().length === 0) {
          !incompleteForm && setIncompleteForm(true);
          setEmailError({
            value: true,
            message: "Empty Field",
          });
        } else {
          if (!isValidEmail(inputValue)) {
            !incompleteForm && setIncompleteForm(true);
            setEmailError({
              value: true,
              message: "Invalid Email",
            });
          }
        }
        break;
      case "password":
        if (inputValue.trim().length === 0) {
          !incompleteForm && setIncompleteForm(true);
          setPasswordError({
            value: true,
            message: "Empty Field",
          });
        }
        break;
    }
  }

  function onChangeHandler(event) {
    const id = event.target.id;
    const value = event.target.value;

    incompleteForm && setIncompleteForm(false);

    switch (id) {
      case "userEmail":
        setEmailError({
          value: false,
          message: "",
        });
        setEmail(value);
        break;
      case "userPassword":
        setPasswordError({
          value: false,
          message: "",
        });
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function togglePassword() {
    setPasswordVisible((prevState) => !prevState);
    setPassType((prevState) => (prevState === "text" ? "password" : "text"));
  }

  function beforeSubmitHandler(event) {
    checkInputValidity(email, "email");
    checkInputValidity(password, "password");
    if (emailError.value || passwordError.value) {
      event.preventDefault();
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: "5rem", sm: "4rem" },
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
            <Grid2 display="flex" justifyContent="center" alignItems="baseline">
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
            {message && (
              <Typography variant="p" color="error">
                {message}
              </Typography>
            )}
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
                    <FormLabel sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
                      Log in
                    </FormLabel>
                  </Typography>
                </Grid2>
                <Grid2>
                  <Form method="post">
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
                        <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Email
                        </label>
                        <TextField
                          onBlur={(event) =>
                            checkInputValidity(event.target.value, "email")
                          }
                          error={emailError.value}
                          autoComplete="off"
                          label={
                            emailError.value ? emailError.message : "Email"
                          }
                          type="email"
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
                        <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Password
                        </label>
                        <TextField
                          onBlur={(event) =>
                            checkInputValidity(event.target.value, "password")
                          }
                          autoComplete="off"
                          error={passwordError.value}
                          type={passType}
                          label={
                            passwordError.value
                              ? passwordError.message
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
                        disabled={incompleteForm}
                        onClick={(event) => beforeSubmitHandler(event)}
                        type="submit"
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
      <Divider sx={{ marginTop: "2rem" }} />
      <Box sx={{ marginTop: "2rem" }}>
        <Footer />
      </Box>
    </>
  );
}
