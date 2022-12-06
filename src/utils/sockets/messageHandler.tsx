import { Server, Socket } from "socket.io";

export default (io: Server, socket: Socket) => {

  socket.on("createdMessage", (msg) => {
    socket.broadcast.emit("newIncomingMessage", msg);
  });

  socket.on("newUserEntered", (msg: string) => {
    console.log("User connected: ", msg);
    socket.broadcast.emit("newUser", msg);
  });

};
