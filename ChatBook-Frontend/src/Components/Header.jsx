import {
  Help,
  Home,
  ListOutlined,
  Login,
  Message,
  Notifications,
  Search,
  Settings,
  ViewSidebar,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  ListItem,
  List,
  Grid2,
  Typography,
  AppBar,
  Button,
  CssBaseline,
  Divider,
  ListItemButton,
  duration,
  Input,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const [sideBar, setSideBar] = useState(false);
  const minScreenSize = useMediaQuery("(min-width:1275px)");

  const navigate = useParams();
  const optionArray = [
    {
      label: "Homepage",
      icon: <Home key="Home" />,
      to: "/",
    },
    {
      label: "Notifications",
      icon: <Notifications key="notifications" />,
      to: "/notifications",
    },
    { label: "Help", icon: <Help key="help" />, to: "/help" },
    { label: "Message", icon: <Message key="message" />, to: "/messages" },
    { label: "Settings", icon: <Settings key="settings" />, to: "/settings" },
    { label: "Login", icon: <Login key="login" />, to: "/login" },
  ];

  useEffect(() => {
    setSideBar(false);
  }, [navigate]);

  const DrawerList = (
    <Box width={250} role="presentation">
      <List>
        {optionArray.map((IconComponent, index) => (
          <motion.div whileHover={{ scale: 1.1 }} key={index}>
            <ListItem>
              <ListItemButton>
                <Link
                  to={IconComponent.to}
                  style={{
                    textDecoration: "none",
                    color: "grey",
                    display: "flex",
                    gap: "3rem",
                  }}
                >
                  {IconComponent.icon}
                  {IconComponent.label}
                </Link>
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <CssBaseline />
        <AppBar
          sx={{
            backgroundColor: "#4B0082",
            padding: "1rem",
            height: { xs: "4.8rem", sm: "6rem" },
            borderRadius: { xs: "4px", sm: "0" },
            alignItems: { xs: "center", sm: "inherit" },
          }}
        >
          <Grid2>
            <motion.div
              initial={{ y: "-100px" }}
              animate={{ y: "0px" }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <Grid2
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid2 container>
                  <Typography
                    component="h5"
                    sx={{
                      color: "white",
                      fontSize: { xs: "20px", sm: "25px", textAlign: "center" },
                    }}
                  >
                    Welcome To Your Personal Chat Space
                  </Typography>
                </Grid2>
                {minScreenSize && (
                  <Grid2>
                    <Input
                      type="search"
                      placeholder="Search"
                      startAdornment={
                        <InputAdornment position="start">
                          <Search sx={{ marginRight: "10px" }} />
                        </InputAdornment>
                      }
                      disableUnderline
                      sx={{
                        border: "transparent",
                        width: "30rem",
                        borderRadius: "1.8rem",
                        backgroundColor: "white",
                        paddingLeft: "1rem",
                        fontSize: "15px",
                        height: "2.5rem",
                      }}
                    ></Input>
                  </Grid2>
                )}

                <Typography>
                  <List sx={{ display: { xs: "none", sm: "flex" } }}>
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <ListItem>
                        <Link to="/" style={{ color: "white" }}>
                          <Home />
                        </Link>
                      </ListItem>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <ListItem>
                        <Link to="/notifications" style={{ color: "white" }}>
                          <Notifications />
                        </Link>
                      </ListItem>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.2 }}>
                      <ListItem>
                        <Link to="/help" style={{ color: "white" }}>
                          <Help />
                        </Link>
                      </ListItem>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <ListItem>
                        <Link to="/messages" style={{ color: "white" }}>
                          <Message />
                        </Link>
                      </ListItem>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <ListItem>
                        <Link to="/settings" style={{ color: "white" }}>
                          <Settings />
                        </Link>
                      </ListItem>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <ListItem>
                        <Link style={{ color: "white" }} to="/login">
                          <Login />
                        </Link>
                      </ListItem>
                    </motion.div>
                  </List>
                </Typography>
              </Grid2>
            </motion.div>
          </Grid2>
        </AppBar>

        <Box
          sx={{
            marginTop: { xs: "5.1rem", sm: "7rem" },
          }}
        >
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                onClick={() => setSideBar(true)}
                sx={{
                  backgroundColor: "#4B0082",
                  width: "100%",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                <ListOutlined />
              </Button>
            </motion.div>
            <Drawer open={sideBar} onClose={() => setSideBar(false)}>
              {DrawerList}
            </Drawer>
          </Box>
          <Box sx={{ marginTop: "1rem", padding: "1rem" }}>
            <Grid2 width="100%">
              <Outlet />
            </Grid2>
          </Box>
        </Box>
      </Box>
    </>
  );
}
