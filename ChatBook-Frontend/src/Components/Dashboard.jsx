import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import {
  Box,
  CircularProgress,
  Divider,
  Grid2, // Assuming Grid2 is a valid import from your library (e.g., MUI v5+)
  IconButton,
  Input,
  Typography,
} from "@mui/material"; // Assuming MUI imports
import { Send } from "@mui/icons-material"; // Assuming MUI icons
import { ChatList, MessageBox } from "react-chat-elements"; // Assuming react-chat-elements imports
import "react-chat-elements/dist/main.css"; // Assuming stylesheet import

// --- Mock/Placeholder Imports (Replace with your actual implementations) ---
// import  socket  from "..utils/socket"; // Assuming you have a socket instance exported
import { LoadUsers } from "../utils/API/http";
import Auth from "../utils/Auth";
import socket from "../utils/Socket";
// async function LoadUsers() {
//   // Replace with your actual API call
//   console.log("Fetching users...");
//   // Example structure, ensure your actual API returns this format
//   // const response = await fetch('/api/users');
//   // const data = await response.json();
//   // return data.users; // Assuming the API returns { users: [...] }
//   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
//   return [
//     {
//       _id: "user1",
//       name: "Alice Smith",
//       avatar: "https://via.placeholder.com/40?text=A",
//     },
//     {
//       _id: "user2",
//       name: "Bob Johnson",
//       avatar: "https://via.placeholder.com/40?text=B",
//     },
//     {
//       _id: "user3",
//       name: "Charlie Brown",
//       avatar: "https://via.placeholder.com/40?text=C",
//     },
//   ];
// }
// async function Auth() {
//   // Replace with your actual auth check
//   console.log("Checking auth...");
//   await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate check delay
//   // return { response: false }; // Simulate failed auth
//   return {
//     response: true,
//     data: { user: { id: "currentUser123", name: "You" } },
//   }; // Simulate successful auth
// }
// // --- End Mock/Placeholder Imports ---

export default function Dashboard() {
  const userId = useRef(null);
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const { data: usersData, isPending: isUsersPending } = useQuery({
    queryKey: ["all-users"],
    queryFn: LoadUsers,
    enabled: !isLoading,
  });
  const [myChats, setMyChats] = useState([]);
  const messageEndRef = useRef(null);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, selectedChat]);

  // 1. Load users
  useEffect(() => {
    // Only process if we have usersData and a valid current userId
    if (usersData && userId.current) {
      setMyChats(
        usersData
          .filter((eachUser) => eachUser._id !== userId.current)
          .map((eachUser) => ({
            id: eachUser._id,
            avatar: eachUser.avatar,
            alt: `${eachUser.name}`,
            title: `${eachUser.name.split(" ")[0]}`,
            lastMessage: "",
            lastMessageTimestamp: null,
          }))
      );
    }
  }, [usersData, userId.current]);

  const redirect = debounce(() => {
    navigate("/");
  }, 2000);

  useEffect(() => {
    async function checkAuth() {
      try {
        const isAuth = await Auth();
        if (!localStorage.getItem("token")) {
          navigate("/");
          return;
        }
        if (!isAuth.response || !isAuth.data?.user?.id) {
          toast.loading("Authentication failed, logging you out...", {
            duration: 1900,
          });
          redirect();
        } else {
          userId.current = isAuth.data.user.id;
          console.log("Authenticated User ID:", userId.current);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        toast.error("Authentication check failed. Please try again.");
        redirect();
      }
    }
    checkAuth();
    return () => {
      redirect.cancel();
    };
  }, []);

  // 3. Handle selecting a chat: fetch history
  function chatHandler(id) {
    setSelectedChat(id);
    setChat([]);

    // Fetch message history for the selected chat
    if (userId.current) {
      socket.emit("getMessages", { to: id, from: userId.current }, (result) => {
        if (result && result.status === 200 && result.data) {
          // Sort messages fetched for the chat window by date
          const sortedMessages = result.data.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          setChat(sortedMessages);

          // Also update the last message in myChats for this specific chat,
          // in case it wasn't updated by a real-time event
          if (sortedMessages.length > 0) {
            const lastMsg = sortedMessages[sortedMessages.length - 1];
            setMyChats((prevMyChats) => {
              const chatIndex = prevMyChats.findIndex((chat) => chat.id === id);
              if (chatIndex !== -1) {
                const updatedChats = [...prevMyChats];
                updatedChats[chatIndex] = {
                  ...updatedChats[chatIndex],
                  lastMessage: lastMsg.message,
                  lastMessageTimestamp: lastMsg.createdAt,
                };
                // Re-sort after updating timestamp from historical data
                updatedChats.sort((a, b) => {
                  const timeA = a.lastMessageTimestamp
                    ? new Date(a.lastMessageTimestamp).getTime()
                    : 0;
                  const timeB = b.lastMessageTimestamp
                    ? new Date(b.lastMessageTimestamp).getTime()
                    : 0;
                  return timeB - timeA;
                });
                return updatedChats;
              }
              return prevMyChats;
            });
          }
        } else {
          console.error("Failed to load messages or invalid response:", result);
          toast.error("Could not load chat history.");
        }
      });
    } else {
      console.error("Cannot fetch messages: userId is not set.");
      toast.error("User session error.");
    }
  }

  // 4. Listen for incoming messages (Real-time updates)
  useEffect(() => {
    // Ensure socket is connected and userId is available before listening
    if (!socket || !userId.current) return;

    const handler = (msg) => {
      msg = msg.data;
      console.log("Received message event:", msg);
      if (!msg || !msg.from || !msg.to || !msg.message || !msg.createdAt) {
        console.warn("Received incomplete/invalid message:", msg);
        return;
      }

      // Determine the ID of the chat partner (the other person in the chat)
      const chatPartnerId = msg.from === userId.current ? msg.to : msg.from;

      // --- Update the Chat List (myChats) state ---
      setMyChats((prevMyChats) => {
        const chatIndex = prevMyChats.findIndex(
          (chat) => chat.id === chatPartnerId
        );

        if (chatIndex !== -1) {
          const updatedChats = [...prevMyChats];
          updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            lastMessage: msg.message,
            lastMessageTimestamp: msg.createdAt,
          };

          // Sort chats to bring the most recent to the top
          updatedChats.sort((a, b) => {
            const timeA = a.lastMessageTimestamp
              ? new Date(a.lastMessageTimestamp).getTime()
              : 0;
            const timeB = b.lastMessageTimestamp
              ? new Date(b.lastMessageTimestamp).getTime()
              : 0;
            return timeB - timeA; // Descending order (newest first)
          });

          return updatedChats;
        }
        // If the chat partner isn't in the list (e.g., a new user started chatting),
        // you might want to add them dynamically here or handle it differently.
        // For now, we only update existing chats.
        console.warn(
          `Chat partner ${chatPartnerId} not found in myChats list.`
        );
        return prevMyChats;
      });

      if (chatPartnerId === selectedChat) {
        // Ensure the message object is consistent
        const messageForChatWindow = {
          _id: msg._id || Date.now().toString(), // Use server ID if available
          to: msg.to,
          from: msg.from,
          message: msg.message,
          createdAt: msg.createdAt,
        };
        // Add message to the currently open chat window
        setChat((prev) => [...prev, messageForChatWindow]);
      }
    };

    socket.on("receiveMessage", handler);
    console.log("Socket listener 'receiveMessage' attached.");

    return () => {
      socket.off("receiveMessage", handler);
      console.log("Socket listener 'receiveMessage' detached.");
    };
  }, [selectedChat, userId.current]);

  const sendMessage = () => {
    if (!message.trim() || !selectedChat || !userId.current) return;

    const messageData = {
      to: selectedChat,
      from: userId.current,
      message: message.trim(),
      // createdAt is usually added by the server/database
    };
    console.log("Sending message:", messageData);

    // Optimistic UI update for the main chat window
    const optimisticMessage = {
      ...messageData,
      _id: `temp-${Date.now().toString()}`, // Temporary unique ID
      createdAt: new Date().toISOString(), // Use ISO string for consistency
    };
    setChat((prev) => [...prev, optimisticMessage]);

    // Optimistic UI update for the chat list subtitle
    setMyChats((prevMyChats) => {
      const chatIndex = prevMyChats.findIndex(
        (chat) => chat.id === selectedChat
      );
      if (chatIndex !== -1) {
        const updatedChats = [...prevMyChats];
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          lastMessage: messageData.message,
          lastMessageTimestamp: optimisticMessage.createdAt, // Use consistent timestamp
        };
        // Re-sort after optimistic update
        updatedChats.sort((a, b) => {
          const timeA = a.lastMessageTimestamp
            ? new Date(a.lastMessageTimestamp).getTime()
            : 0;
          const timeB = b.lastMessageTimestamp
            ? new Date(b.lastMessageTimestamp).getTime()
            : 0;
          return timeB - timeA; // Descending order (newest first)
        });
        return updatedChats;
      }
      return prevMyChats;
    });

    // Emit the message to the server
    socket.emit("sendMessage", messageData);

    // Clear the input field
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default newline behavior
      sendMessage();
    }
  };

  if (isLoading) {
    return (
      <Grid2
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid2>
    );
  }

  return (
    <Grid2 gap="2rem" sx={{ display: "flex", height: "440px" }}>
      <Grid2
        sx={{
          backgroundColor: "white",
          width: "30%",
          minWidth: "250px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Typography
          align="center"
          fontWeight={700}
          padding="15px"
          sx={{ flexShrink: 0 }}
        >
          Connections
        </Typography>
        <Divider sx={{ mx: 2, mb: 1, flexShrink: 0 }} />
        <Box sx={{ overflowY: "auto", flexGrow: 1, pb: 1 }}>
          {isUsersPending ? (
            <Grid2 display="flex" justifyContent={"center"} sx={{ pt: 4 }}>
              <CircularProgress />
            </Grid2>
          ) : myChats.length === 0 ? (
            <Typography align="center" sx={{ mt: 2, color: "text.secondary" }}>
              No connections found.
            </Typography>
          ) : (
            myChats.map((eachChat) => (
              <ChatList
                key={eachChat.id}
                className={`chat-list ${
                  selectedChat === eachChat.id ? "chat-list-selected" : ""
                }`} // Add selected class
                dataSource={[
                  {
                    avatar: eachChat.avatar,
                    title: eachChat.title,
                    // Use the lastMessage from the state, provide fallback
                    subtitle: eachChat.lastMessage || "...",
                    // Optionally show timestamp (requires react-chat-elements support/customization)
                    date: eachChat.lastMessageTimestamp
                      ? new Date(eachChat.lastMessageTimestamp)
                      : null,
                  },
                ]}
                onClick={() => chatHandler(eachChat.id)}
                // Style selected item (basic example, customize ChatList if possible)
                style={{
                  backgroundColor:
                    selectedChat === eachChat.id ? "#eee" : "transparent",
                }}
              />
            ))
          )}
        </Box>
      </Grid2>
      <Grid2
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f7f7f7", 
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
          {selectedChat ? (
            chat.length > 0 ? (
              chat.map((eachMessage) => (
                <MessageBox
                  key={eachMessage._id} // Use message ID as key
                  position={
                    eachMessage.from === userId.current ? "right" : "left"
                  }
                  type="text"
                  text={eachMessage.message}
                  date={
                    eachMessage.createdAt
                      ? new Date(eachMessage.createdAt)
                      : new Date()
                  } // Show message time
                  // Add unique IDs if needed by MessageBox for rendering optimization
                  // id={eachMessage._id}
                />
              ))
            ) : (
              <Typography
                align="center"
                sx={{ mt: 4, color: "text.secondary" }}
              >
                Start the conversation!
              </Typography>
            )
          ) : (
            <Typography
              align="center"
              variant="h5"
              sx={{ mt: 4, color: "text.secondary" }}
            >
              Welcome to ChatBook!
              <br /> Select a Chat from the left panel.
            </Typography>
          )}
          {/* Optional: Add a ref and scroll to bottom on new message */}
        </Box>

        {/* Input area - Only show if a chat is selected */}
        {selectedChat && (
          <Box
            sx={{
              p: 1,
              backgroundColor: "white",
              borderTop: "1px solid #eee",
              flexShrink: 0,
            }}
          >
            <Input
              placeholder="Type here..."
              disableUnderline
              endAdornment={
                <IconButton
                  sx={{ pr: "1rem" }}
                  onClick={sendMessage}
                  disabled={!message.trim()}
                >
                  <Send color={!message.trim() ? "disabled" : "primary"} />
                </IconButton>
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress} // Add Enter key handler
              fullWidth
              sx={{
                backgroundColor: "#f0f0f0", // Slightly different input background
                pl: 2,
                pr: 1, // Adjust padding for button
                borderRadius: "20px",
                minHeight: "3rem",
                border: "none", // Remove default border if any
              }}
            />
          </Box>
        )}
      </Grid2>
    </Grid2>
  );
}
