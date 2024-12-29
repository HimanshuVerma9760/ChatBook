import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function SignUpPage() {
  const response = useActionData() || {};
  const message = response.message || null;

  const [nameError, setNameError] = useState({
    value: false,
    message: "",
  });
  const [emailError, setEmailError] = useState({
    value: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    value: false,
    message: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    value: false,
    message: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passType, setPassType] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [incompleteForm, setIncompleteForm] = useState(true);

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNameError({
      value: false,
      message: "",
    });
    setEmailError({
      value: false,
      message: "",
    });
    setPasswordError({
      value: false,
      message: "",
    });
    setConfirmPasswordError({
      value: false,
      message: "",
    });
    setPasswordVisible(false);
    setPassType("password");
    setIncompleteForm(true);
  }, [message]);

  function onChangeHandler(event) {
    setIncompleteForm(false);
    const id = event.target.id;
    const value = event.target.value;
    switch (id) {
      case "fullName":
        setNameError(() => {
          return {
            value: false,
            message: "",
          };
        });
        setName(value);
        break;
      case "userEmail":
        setEmailError(() => {
          return {
            value: false,
            message: "",
          };
        });
        setEmail(value);
        break;
      case "userPassword":
        setPasswordError(() => {
          return {
            value: false,
            message: "",
          };
        });
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPasswordError(() => {
          return {
            value: false,
            message: "",
          };
        });
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  }
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function checkInputValidity(inputValue, inputType) {
    switch (inputType) {
      case "name":
        if (inputValue.trim().length === 0) {
          !incompleteForm && setIncompleteForm(true);
          setNameError(() => {
            return {
              value: true,
              message: "Empty Name Field",
            };
          });
        } else {
          const nameArr = inputValue.split("");
          for (const ch of nameArr) {
            if (!isNaN(ch)) {
              if (ch !== " ") {
                !incompleteForm && setIncompleteForm(true);
                setNameError(() => {
                  return {
                    value: true,
                    message: "Name must not contain a number!",
                  };
                });
              }
            }
          }
        }
        break;
      case "email":
        if (inputValue.trim().length === 0) {
          !incompleteForm && setIncompleteForm(true);
          setEmailError(() => {
            return {
              value: true,
              message: "Empty Email Field",
            };
          });
        } else {
          if (!isValidEmail(inputValue)) {
            !incompleteForm && setIncompleteForm(true);
            setEmailError(() => {
              return {
                value: true,
                message: "Invalid Email!",
              };
            });
          }
        }
        break;
      case "password":
        if (inputValue.trim().length === 0) {
          !incompleteForm && setIncompleteForm(true);
          setPasswordError(() => {
            return {
              value: true,
              message: "Empty Password Field",
            };
          });
        } else if (inputValue.trim().length < 8) {
          !incompleteForm && setIncompleteForm(true);
          setPasswordError(() => {
            return {
              value: true,
              message: "Password length should be atleast 8 character long!",
            };
          });
        }
        break;
      case "confirmPassword":
        if (inputValue.trim().length === 0) {
          !incompleteForm && setIncompleteForm(true);
          setConfirmPasswordError(() => {
            return {
              value: true,
              message: "Empty Field",
            };
          });
        } else if (inputValue.trim() !== password) {
          !incompleteForm && setIncompleteForm(true);
          setConfirmPasswordError(() => {
            return {
              value: true,
              message: "Password Missmatched!",
            };
          });
        }
        break;
      default:
        break;
    }
  }

  function visiblityHandler() {
    setPassType((prevState) =>
      prevState === "password" ? "text" : "password"
    );
    setPasswordVisible((prevState) => !prevState);
  }

  function beforeSubmitHandler(event) {
    checkInputValidity(name, "name");
    checkInputValidity(email, "email");
    checkInputValidity(password, "password");
    checkInputValidity(confirmPassword, "confirmPassword");
    if (
      nameError.value ||
      emailError.value ||
      passwordError.value ||
      confirmPasswordError.value
    ) {
      event.preventDefault();
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: { xs: "2.5rem", sm: "5rem" },
          color: "#4B0082",
          overflow: "hidden",
        }}
      >
        <Box sx={{ textAlign: "center", width: { xs: "100%", sm: "50%" } }}>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: "0.5rem", sm: "2rem" },
            }}
          >
            <Grid2>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "26px", sm: "45px" },
                  fontWeight: "bold",
                }}
              >
                Welcome to ChatBook!
              </Typography>
              <Typography
                variant="p"
                sx={{ fontSize: { xs: "11.5px", sm: "20px" } }}
              >
                We’re excited to have you join us. Please sign up to get started
                and explore all the features we offer.
              </Typography>
            </Grid2>
            <Grid2>
              <Typography
                variant="h5"
                fontWeight={580}
                sx={{ fontSize: { sm: "32px", xs: "18px" } }}
              >
                Already have an account?
              </Typography>
              <Typography
                variant="p"
                sx={{ fontSize: { xs: "13px", sm: "15px" } }}
              >
                <Link to="/login">Login here</Link>
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
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Grid2 alignItems="center" alignContent="center">
              <Grid2 display="flex" flexDirection="column" gap="2rem">
                <Grid2>
                  <Typography align="center">
                    <FormLabel sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
                      Sign Up
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
                        width: { xs: "20rem", sm: "30rem" },
                      }}
                    >
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{ gap: "10px" }}
                      >
                        <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Full Name
                        </label>
                        <TextField
                          onBlur={() => checkInputValidity(name, "name")}
                          autoComplete="off"
                          label={
                            nameError.value ? nameError.message : "Full Name"
                          }
                          error={nameError.value}
                          id="fullName"
                          name="fullName"
                          value={name}
                          onChange={(event) => onChangeHandler(event)}
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
                          Email
                        </label>
                        <TextField
                          autoComplete="off"
                          onBlur={() => checkInputValidity(email, "email")}
                          label={
                            emailError.value ? emailError.message : "Email"
                          }
                          type="email"
                          error={emailError.value}
                          id="userEmail"
                          value={email}
                          name="userEmail"
                          onChange={(event) => onChangeHandler(event)}
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
                          onBlur={() =>
                            checkInputValidity(password, "password")
                          }
                          label={
                            passwordError.value
                              ? passwordError.message
                              : "Password"
                          }
                          type={passType}
                          error={passwordError.value}
                          value={password}
                          id="userPassword"
                          name="userPassword"
                          autoComplete="off"
                          onChange={(event) => onChangeHandler(event)}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <motion.div whileHover={{ cursor: "pointer" }}>
                                  <InputAdornment position="end">
                                    <IconButton onClick={visiblityHandler}>
                                      {passwordVisible ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                </motion.div>
                              ),
                            },
                          }}
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
                          Confirm Password
                        </label>
                        <TextField
                          onBlur={() =>
                            checkInputValidity(
                              confirmPassword,
                              "confirmPassword"
                            )
                          }
                          label={
                            confirmPasswordError.value
                              ? confirmPasswordError.message
                              : "Confirm Password"
                          }
                          error={confirmPasswordError.value}
                          autoComplete="off"
                          value={confirmPassword}
                          id="confirmPassword"
                          name="confirmPassword"
                          onChange={(event) => onChangeHandler(event)}
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
                        type="submit"
                        onClick={beforeSubmitHandler}
                      >
                        Submit
                      </Button>
                    </Grid2>
                  </Form>
                </Grid2>
              </Grid2>
            </Grid2>
          </motion.div>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "2rem" }} />
      <Box sx={{ marginTop: "2rem" }}>
        <Footer />
      </Box>
    </>
  );
}
