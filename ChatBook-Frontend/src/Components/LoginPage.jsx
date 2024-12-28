import {
  Box,
  Button,
  FormControl,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Link, useActionData } from "react-router-dom";

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
          gap: "5rem",
          color: "#4B0082",
        }}
      >
        <Box sx={{ textAlign: "center", width: "50%" }}>
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Grid2>
              <Typography variant="h3">Welcome to ChatBook!</Typography>
              <Typography variant="p">
                We’re excited to have you back with us. Please login to get
                started and explore all new features.
              </Typography>
            </Grid2>
            <Grid2>
              <Typography variant="h5">Don't have an account?</Typography>
              <Link to="/sign-up">Sign-up</Link>
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
              {/* <Grid2>
                <FormLabel sx={{ fontSize: "2rem" }}>Log in</FormLabel>
              </Grid2> */}
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
                      <label style={{ fontSize: "20px" }}>
                        Phone or Username
                      </label>
                      <TextField
                        label="Phone or Username"
                        id="firstName"
                        name="firstName"
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
          </Grid2>
        </Box>
      </Box>
    </>
  );
}
