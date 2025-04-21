import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL || "http://localhost:3000";

// Initialize socket.io-client
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
  auth: { token: localStorage.getItem("token") },
});

export default socket;
