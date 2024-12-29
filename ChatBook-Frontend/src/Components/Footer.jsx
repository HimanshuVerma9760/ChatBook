import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer" sx={{ width: "100%" }}>
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} ChatBook by Himanshu
      </Typography>
      <Typography variant="body2" align="center" color="grey">
        <Link to="/" style={{ color: "inherit" }}>
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link to="/" style={{ color: "inherit" }}>
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
