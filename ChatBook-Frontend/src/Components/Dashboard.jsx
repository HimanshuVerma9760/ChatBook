import { Box, Grid2, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ChatList, MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

export default function Dashboard() {
  const { isAuth } = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, isAuth]);

  if (!isAuth) {
    return (
      <>
        <Typography variant="h3" align="center">
          Loading....
        </Typography>
      </>
    );
  }

  return (
    <>
      <Grid2 container gap="4rem">
        <Grid2 sx={{ maxWidth: "30%" }}>
          <Grid2>
            <Typography>Dashboard</Typography>
          </Grid2>
          <Grid2>
            <ChatList
              className="chat-list"
              dataSource={[
                {
                  avatar:
                    "https://avatars.githubusercontent.com/u/80540635?v=4",
                  alt: "kursat_avatar",
                  title: "Kursat",
                  subtitle:
                    "Why don't we go to the No Way Home movie this weekend ?",
                  date: new Date(),
                  unread: 3,
                },
                {
                  avatar:
                    "https://avatars.githubusercontent.com/u/80540635?v=4",
                  alt: "kursat_avatar",
                  title: "Kursat",
                  subtitle:
                    "Why don't we go to the No Way Home movie this weekend ?",
                  date: new Date(),
                  unread: 3,
                },
                {
                  avatar:
                    "https://avatars.githubusercontent.com/u/80540635?v=4",
                  alt: "kursat_avatar",
                  title: "Kursat",
                  subtitle:
                    "Why don't we go to the No Way Home movie this weekend ?",
                  date: new Date(),
                  unread: 3,
                },
                {
                  avatar:
                    "https://avatars.githubusercontent.com/u/80540635?v=4",
                  alt: "kursat_avatar",
                  title: "Kursat",
                  subtitle:
                    "Why don't we go to the No Way Home movie this weekend ?",
                  date: new Date(),
                  unread: 3,
                },
              ]}
            />
          </Grid2>
        </Grid2>
        <Grid2>
          <MessageBox
            position={"left"}
            type={"text"}
            title={"Message Box Title"}
            text="Here is a text type message box"
          />
        </Grid2>
      </Grid2>
    </>
  );
}
