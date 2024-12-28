import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{width:'100%'}}>
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} Your Company Name
      </Typography>
      <Typography variant="body2" align="center" color="grey">
        <Link href="https://example.com" color="inherit">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link href="https://example.com" color="inherit">
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
