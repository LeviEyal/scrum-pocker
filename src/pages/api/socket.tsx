import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, UsersDataEvent } from "../../interfaces/interfaces";

const usersData: UsersDataEvent = {};

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => {
    socket.on("userConnected", (msg) => {
      usersData[msg.username] = {
        username: msg.username,
        vote: null,
      };
      console.log("userConnected", msg, ", usersData", usersData);
      io.emit("userConnected", msg);
      io.emit("usersData", usersData);
    });

    socket.on("userDisconnected", (msg) => {
      delete usersData[msg.username];
      console.log("user disconnected", msg, ", usersData", usersData);
      io.emit("userDisconnected", msg);
      io.emit("usersData", usersData);
    });

    socket.on("userVoted", (msg) => {
      usersData[msg.username] = {
        username: msg.username,
        vote: msg.vote,
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
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}
