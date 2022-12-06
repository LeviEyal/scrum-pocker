import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, UsersDataEvent } from "../../interfaces/interfaces";

const usersData: UsersDataEvent = {};

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }
  console.log("Setting up socket.io server");
  
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => {
    socket.on("userConnected", (msg) => {
      usersData[msg.username] = {
        username: msg.username,
        vote: null,
        id: socket.id,
      };
      console.log("userConnected", msg, ", usersData", usersData);
      io.emit("userConnected", msg);
      io.emit("usersData", usersData);
    });

    socket.on("userDisconnected", (msg) => {
      delete usersData[msg.username];
      delete usersData[''];
      console.log("user disconnected", msg, ", usersData", usersData);
      io.emit("userDisconnected", msg);
      io.emit("usersData", usersData);
    });

    socket.on("userVoted", (msg) => {
      usersData[msg.username] = {
        username: msg.username,
        vote: msg.vote,
        id: socket.id,
      };
      console.log("User voted", msg, ", usersData", usersData);
      io.emit("userVoted", msg);
      io.emit("usersData", usersData);
    });

    socket.on("userReset", (msg) => {
      Object.keys(usersData).forEach((username) => {
        usersData[username].vote = null;
      });
      console.log("User reset", msg, ", usersData", usersData);
      io.emit("userReset", msg);
      io.emit("usersData", usersData);
    });

    socket.on("userRevealed", (msg) => {
      io.emit("userRevealed", msg);
    });

    socket.on("userUnrevealed", (msg) => {
      io.emit("userUnrevealed", msg);
    });

    socket.on("disconnect", () => {
      const username = Object.keys(usersData).find((username) => usersData[username].id === socket.id);
      if (username) {
        delete usersData[username];
        console.log("user disconnected", username, ", usersData", usersData);
        io.emit("userDisconnected", { username });
        io.emit("usersData", usersData);
      }
      console.log("user disconnected");
    });

    socket.on("update", ({username}) => {
      if (!usersData[username]) {
        usersData[username] = {
          username,
          vote: null,
          id: socket.id,
        };
      }
      io.emit("usersData", usersData);
    });
  };

  // Define actions inside
  io.on("connection", onConnection);

  io.on("disconnect", (socket) => {
    const username = Object.keys(usersData).find((username) => usersData[username].id === socket.id);
    if (username) {
      delete usersData[username];
      console.log("user disconnected", username, ", usersData", usersData);
      io.emit("userDisconnected", { username });
      io.emit("usersData", usersData);
    }
    console.log("user disconnected");
  });

  console.log("Setting up socket");
  res.end();
}
