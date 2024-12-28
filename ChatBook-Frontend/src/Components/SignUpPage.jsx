import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { motion } from "framer-motion";

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
  const [error, setError] = useState("");

  function onChangeHandler(event) {
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
    if (
      nameError.value === false &&
      emailError.value === false &&
      passwordError.value === false &&
      confirmPasswordError.value === false
    ) {
      setIncompleteForm(false);
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
              !incompleteForm && setIncompleteForm(true);
              setNameError(() => {
                return {
                  value: true,
                  message: "Name must not contain a number!",
                };
              });
              break;
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
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      setError("Incomplete");
      event.preventDefault();
    }else{

    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5rem",
          color: "#4B0082",
        }}
      >
        <Box sx={{ textAlign: "center", width: "50%" }}>
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Grid2>
              <Typography variant="h3">Welcome to ChatBook!</Typography>
              <Typography variant="p">
                We’re excited to have you join us. Please sign up to get started
                and explore all the features we offer.
              </Typography>
            </Grid2>
            <Grid2>
              <Typography variant="h5">Already have an account?</Typography>
              <Link to="/login">Login here</Link>
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
            <Grid2 display="flex" flexDirection="column" gap="2rem">
              <Grid2>
                <FormLabel sx={{ fontSize: "2rem" }}>Sign Up</FormLabel>
              </Grid2>
              <Grid2>
                <Form method="post">
                  <Grid2
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      width: "30rem",
                    }}
                  >
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ gap: "10px" }}
                    >
                      <label style={{ fontSize: "20px" }}>Full Name</label>
                      <TextField
                        onBlur={() => checkInputValidity(name, "name")}
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
                      <label style={{ fontSize: "20px" }}>Email</label>
                      <TextField
                        onBlur={() => checkInputValidity(email, "email")}
                        label={emailError.value ? emailError.message : "Email"}
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
                      <label style={{ fontSize: "20px" }}>Password</label>
                      <TextField
                        onBlur={() => checkInputValidity(password, "password")}
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
                      <label style={{ fontSize: "20px" }}>
                        Confirm Password
                      </label>
                      <TextField
                        onBlur={() =>
                          checkInputValidity(confirmPassword, "confirmPassword")
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
                      color={error && "error"}
                    >
                      {error || "Submit"}
                    </Button>
                  </Grid2>
                </Form>
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </>
  );
}
