import { Box, Grid2, Typography } from "@mui/material";
import { useAuth } from "../Hooks/useAuth.js";

export default function Dashboard() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">Loading....</Typography>
      </Box>
    );
  }
  return (
    <>
      <Box>
        <Grid2>
          <Typography variant="h4">Dashboard</Typography>
        </Grid2>
      </Box>
    </>
  );
}
