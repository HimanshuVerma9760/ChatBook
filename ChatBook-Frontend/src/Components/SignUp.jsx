import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Link, useActionData } from "react-router-dom";

export default function Login() {
  const response = useActionData() || {};
  const message = response.message || null;

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
        <Box sx={{ textAlign: "center" }}>
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Grid2>
              <Typography variant="h3">Welcome to Our Application!</Typography>
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
                      <label style={{ fontSize: "20px" }}>First Name</label>
                      <TextField
                        label="First Name"
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
                      <label style={{ fontSize: "20px" }}>Last Name</label>
                      <TextField
                        label="Last Name"
                        id="lastName"
                        name="lastName"
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
                        label="Email"
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
                      <label style={{ fontSize: "20px" }}>Contact</label>
                      <TextField
                        label="Phone"
                        id="userPhone"
                        name="userPhone"
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
