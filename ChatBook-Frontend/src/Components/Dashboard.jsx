import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ChatList, MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
// import { Input } from "react-chat-elements";
import { Send } from "@mui/icons-material";

export default function Dashboard() {
  const { isAuth } = useLoaderData();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [myChats, setMyChats] = useState([
    {
      id: "123",
      avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
      alt: "kursat_avatar",
      title: "Kursat",
      subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    },
    {
      id: "456",
      avatar: "/dog.jpeg",
      alt: "Doggy",
      title: "Doggy",
      subtitle: "Where is my food, this morning Sirrrr?",
    },
  ]);
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

  function chatHandler(id) {
    setSelectedChat(id);
  }
  return (
    <>
      <Grid2 container gap="4rem">
        <Grid2
          sx={{ maxWidth: "30%", minHeight: "37rem", backgroundColor: "white" }}
        >
          <Grid2>
            <Typography align="center" fontWeight={700} padding="15px">
              Connections
            </Typography>
            <Divider
              sx={{
                marginLeft: "15px",
                marginRight: "15px",
                marginBottom: "20px",
              }}
            />
          </Grid2>
          <Grid2>
            {myChats.map((eachChat) => {
              return (
                <ChatList
                  className="chat-list"
                  dataSource={[
                    {
                      avatar: eachChat.avatar,
                      title: eachChat.title,
                      subtitle: eachChat.subtitle,
                    },
                  ]}
                  onClick={() => chatHandler(eachChat.id)}
                  key={eachChat.id}
                />
              );
            })}
          </Grid2>
        </Grid2>
        <Grid2
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid2>
            {selectedChat !== null ? (
              <Grid2>
                {myChats.map((eachChat) => {
                  return (
                    selectedChat === eachChat.id && (
                      <MessageBox
                        position={"left"}
                        type={"text"}
                        title={eachChat.title}
                        text={eachChat.subtitle}
                      />
                    )
                  );
                })}
              </Grid2>
            ) : (
              <>
                <Typography align="center" variant="h5">
                  Welcome to ChatBook!
                  <br />
                  Select You Chat from the left panel
                </Typography>
              </>
            )}
          </Grid2>
          <Grid2 sx={{ width: "60rem" }}>
            <Typography align="right" display="flex" gap="10px">
              <Input
                placeholder="Type here..."
                disableUnderline
                endAdornment={
                  <IconButton sx={{paddingRight:'1rem'}}> 
                    <Send />
                  </IconButton>
                }
                sx={{ width: "60rem", backgroundColor:'white', paddingLeft:'2rem', borderRadius:'20px', minHeight:'3rem'}}
              />
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
