import {
  Check,
  CheckCircle,
  CheckCircleOutline,
  TaskAlt,
  TaskAltOutlined,
  TaskAltRounded,
  Verified,
  VerifiedOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { toast, Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import signup from "../utils/API/http";
import { debounce } from "lodash";
const Conn = import.meta.env.VITE_BACKEND_URL;

export default function SignUpPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({
    nameError: {
      state: false,
      message: "",
    },
    emailError: {
      state: false,
      message: "",
    },
    passwordError: {
      state: false,
      message: "",
    },
    confirmPasswordError: {
      state: false,
      message: "",
    },
    userNameError: {
      state: false,
      message: "",
    },
  });
  const redirect = debounce(() => {
    navigate("/");
  }, 2000);
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [hasUsername, setHasUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passType, setPassType] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.dismiss();
      toast.loading("Successfully registered! redirecting to login page...", {
        duration: 1900,
      });
      redirect();
    },
    onError: (error) => {
      toast.dismiss();
      console.log("error.......", error.status);
      if (error.status === 409) {
        toast.error("Email already registered!");
      } else {
        toast.error(error.message);
      }
    },
  });
  function submitHandler() {
    const userData = {
      name: name,
      email: email,
      password: password,
      username: userName,
    };
    toast.promise(
      mutate({ userData }),
      {
        loading: "Please wait...",
      },
      {
        style: {
          minWidth: "250px",
        },
        loading: {
          duration: 3000,
        },
      }
    );
  }
  function onChangeHandler(event) {
    const id = event.target.id;
    const value = event.target.value;
    switch (id) {
      case "fullName":
        if (error.nameError.state) {
          setError((prevState) => ({
            ...prevState,
            nameError: {
              state: false,
              message: "",
            },
          }));
        }
        setName(value);
        break;
      case "userEmail":
        if (error.emailError.state) {
          setError((prevState) => ({
            ...prevState,
            emailError: {
              state: false,
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
              state: false,
              message: "",
            },
          }));
        }
        setPassword(value);
        break;
      case "confirmPassword":
        if (error.confirmPasswordError.state) {
          setError((prevState) => ({
            ...prevState,
            confirmPasswordError: {
              state: false,
              message: "",
            },
          }));
        }
        setConfirmPassword(value);
        break;
      case "userName":
        if (error.userNameError.state) {
          setError((prevState) => ({
            ...prevState,
            userNameError: {
              state: false,
              message: "",
            },
          }));
        }
        if (hasUsername) {
          setHasUsername(false);
        }
        setUsername(value);
        break;
      default:
        break;
    }
  }
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function blurHandler(event) {
    const key = event.target.id;
    const value = event.target.value;
    switch (key) {
      case "fullName":
        if (value.trim().length === 0) {
          setError((prevState) => ({
            ...prevState,
            nameError: {
              state: true,
              message: "Empty field",
            },
          }));
        } else {
          const nameArr = value.split("");
          for (const ch of nameArr) {
            if (!isNaN(ch)) {
              if (ch !== " ") {
                // !incompleteForm && setIncompleteForm(true);
                setError((prevState) => ({
                  ...prevState,
                  nameError: {
                    state: true,
                    message: "Name must not contain numbers",
                  },
                }));
              }
            }
          }
        }
        break;
      case "userEmail":
        if (value.trim().length === 0) {
          setError((prevState) => ({
            ...prevState,
            emailError: {
              state: true,
              message: "Empty field",
            },
          }));
        } else {
          if (!isValidEmail(value)) {
            setError((prevState) => ({
              ...prevState,
              emailError: {
                state: true,
                message: "Invalid email provided",
              },
            }));
          }
        }
        break;
      case "password":
        if (value.trim().length === 0) {
          setError((prevState) => ({
            ...prevState,
            passwordError: {
              state: true,
              message: "Password cannot be empty",
            },
          }));
        } else if (value.trim().length < 8) {
          setError((prevState) => ({
            ...prevState,
            passwordError: {
              state: true,
              message: "Password must contain atleast 8 characters",
            },
          }));
        }
        break;
      case "confirmPassword":
        if (value.trim().length === 0) {
          setError((prevState) => ({
            ...prevState,
            confirmPasswordError: {
              state: true,
              message: "Empty field",
            },
          }));
        } else if (value.trim() !== password) {
          setError((prevState) => ({
            ...prevState,
            confirmPasswordError: {
              state: true,
              message: "Password Mismatched",
            },
          }));
        }
        break;
      case "userName":
        if (value.trim().length === 0) {
          setError((prevState) => ({
            ...prevState,
            userNameError: {
              state: true,
              message: "Empty field",
            },
          }));
        } else if (value.trim().length < 5 || value.trim().length > 15) {
          setError((prevState) => ({
            ...prevState,
            userNameError: {
              state: true,
              message: "Username must be between 5 to 15 characters",
            },
          }));
        }
        break;
      default:
        break;
    }
  }

  async function checkAvailabilityHandler() {
    setIsChecking(true);
    try {
      const response = await fetch(
        `${Conn}/users/check-username/?username=${userName}`
      );
      if (!response.ok) {
        setError((prevState) => ({
          ...prevState,
          userNameError: {
            state: true,
            message: "Username already taken",
          },
        }));
        toast("Username already taken");
      } else {
        toast.success("Username accepted!");
        setHasUsername(true);
      }
      setIsChecking(false);
    } catch (error) {
      console.log(error);
      setIsChecking(false);
    }
  }

  function visiblityHandler() {
    setPassType((prevState) =>
      prevState === "password" ? "text" : "password"
    );
    setPasswordVisible((prevState) => !prevState);
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
        <Toaster />
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
                <Link to="/">Login here</Link>
              </Typography>
            </Grid2>
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
                  {/* <Form method="post"> */}
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
                      {/* <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Full Name
                        </label> */}
                      <TextField
                        size="small"
                        onBlur={(event) => blurHandler(event)}
                        autoComplete="off"
                        autoFocus
                        label={
                          error.userNameError.state
                            ? error.userNameError.message
                            : "Username"
                        }
                        error={error.userNameError.state}
                        id="userName"
                        name="userName"
                        value={userName}
                        onChange={(event) => onChangeHandler(event)}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                        }}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                {isChecking ? (
                                  <CircularProgress size={20} />
                                ) : (
                                  <Tooltip
                                    title={
                                      hasUsername
                                        ? "Verified"
                                        : "Check availability"
                                    }
                                  >
                                    <IconButton
                                      size="small"
                                      onClick={checkAvailabilityHandler}
                                      disabled={
                                        hasUsername || error.userNameError.state
                                      }
                                    >
                                      {hasUsername ? (
                                        <CheckCircle />
                                      ) : (
                                        <CheckCircleOutline />
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      <Typography variant="caption">
                        Check username availability first
                      </Typography>
                    </FormControl>
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ gap: "10px" }}
                    >
                      {/* <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Full Name
                        </label> */}
                      <TextField
                        size="small"
                        disabled={!hasUsername}
                        onBlur={(event) => blurHandler(event)}
                        autoComplete="off"
                        label={
                          error.nameError.state
                            ? error.nameError.message
                            : "Full Name"
                        }
                        error={error.nameError.state}
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
                      {/* <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Email
                        </label> */}
                      <TextField
                        size="small"
                        disabled={!hasUsername}
                        autoComplete="off"
                        onBlur={(event) => blurHandler(event)}
                        label={
                          error.emailError.state
                            ? error.emailError.message
                            : "Email"
                        }
                        type="email"
                        error={error.emailError.state}
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
                      {/* <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Password
                        </label> */}
                      <TextField
                        size="small"
                        onBlur={(event) => blurHandler(event)}
                        disabled={!hasUsername}
                        label={
                          error.passwordError.state
                            ? error.passwordError.message
                            : "Password"
                        }
                        type={passType}
                        error={error.passwordError.state}
                        value={password}
                        id="userPassword"
                        name="userPassword"
                        autoComplete="off"
                        onChange={(event) => onChangeHandler(event)}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={visiblityHandler}
                                  disabled={!hasUsername}
                                >
                                  {passwordVisible ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
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
                      {/* <label style={{ fontSize: { xs: "15px", sm: "20px" } }}>
                          Confirm Password
                        </label> */}
                      <TextField
                        disabled={!hasUsername}
                        size="small"
                        onBlur={(event) => blurHandler(event)}
                        label={
                          error.confirmPasswordError.state
                            ? error.confirmPasswordError.message
                            : "Confirm Password"
                        }
                        error={error.confirmPasswordError.state}
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
                      disabled={
                        error.nameError.state ||
                        error.emailError.state ||
                        error.passwordError.state ||
                        error.confirmPasswordError.state ||
                        error.userNameError.state ||
                        !hasUsername
                      }
                      type="button"
                      onClick={submitHandler}
                    >
                      Submit
                    </Button>
                  </Grid2>
                  {/* </Form> */}
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
