import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Link, useActionData } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";

export default function LoginPage() {
  const response = useActionData || {};
  const message = response.message || "";

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
        <Box sx={{ textAlign: "center", width: { xs: "100%", sm: "50%" } }}>
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
                We’re excited to have you back with us. Please login to get
                started and explore all new features.
              </Typography>
            </Grid2>
            <Grid2 display="flex" justifyContent="center" alignItems="baseline">
              <Typography
                variant="h5"
                fontWeight={580}
                sx={{ fontSize: { sm: "32px", xs: "18px" } }}
                align="center"
              >
                Don't have an account?
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: { xs: "13px", sm: "15px" },
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
                        width: { xs: "20rem", sm: "30rem" },
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
                          label="Email"
                          type="email"
                          id="userEmail"
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
                          type="password"
                          label="Password"
                          id="userPassword"
                          name="userPassword"
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                          }}
                        />
                      </FormControl>
                    </Grid2>
                    <Grid2 textAlign="center" marginTop="10px">
                      <Button type="submit">Submit</Button>
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
