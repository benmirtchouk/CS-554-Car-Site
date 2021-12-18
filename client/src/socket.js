import React from "react";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3001";

const socket = io(SOCKET_URL);
const SocketContext = React.createContext(socket);

export { socket, SocketContext };