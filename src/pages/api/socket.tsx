import { Server, Socket } from "socket.io";
import {
	ClientToServerEvents,
	ServerToClientEvents,
	GameState,
} from "../../interfaces/interfaces";

const gameState: GameState = {
	votes: {},
	revealed: false,
};

export default function SocketHandler(req, res) {
	if (res.socket.server.io) {
		console.log("Already set up");
		res.end();
		return;
	}
	console.log("Setting up socket.io server");

	const io = new Server(res.socket.server);
	res.socket.server.io = io;

	const emitGameState = () => {
		const revealed = gameState.revealed;
		const t = revealed
			? gameState
			: {
					...gameState,
					votes: Object.fromEntries(
						Object.entries(gameState.votes).map(([username, vote]) => [
							username,
							{ ...vote, vote: "Nice try"},
						])
					),
			  };
		io.emit("gameState", t);
	};

	const onConnection = (
		socket: Socket<ClientToServerEvents, ServerToClientEvents>
	) => {
		socket.on("userConnected", (msg) => {
			gameState.votes[msg.username] = {
				username: msg.username,
				vote: null,
				id: socket.id,
			};
			console.log("userConnected", msg, ", gameState", gameState);
			io.emit("userConnected", msg);
			emitGameState();
		});

		socket.on("userDisconnected", (msg) => {
			delete gameState.votes[msg.username];
			delete gameState.votes[""];
			console.log("user disconnected", msg, ", gameState", gameState);
			io.emit("userDisconnected", msg);
			emitGameState();
		});

		socket.on("applyVote", (msg) => {
			gameState.votes[msg.username] = {
				username: msg.username,
				vote: msg.vote,
				id: socket.id,
			};
			console.log("User voted", msg, ", gameState", gameState);
			io.emit("userVoted", msg);
			emitGameState();
		});

		socket.on("startVotingSession", () => {
			Object.keys(gameState.votes).forEach((username) => {
				gameState.votes[username].vote = null;
			});
			io.emit("sessionStarted");
      gameState.revealed = false;
      emitGameState();
		});
    
		socket.on("stopVotingSession", () => {
      io.emit("sessionStoped");
      gameState.revealed = true;
			emitGameState();
		});

		socket.on("disconnect", () => {
			const username = Object.keys(gameState.votes).find(
				(username) => gameState.votes[username].id === socket.id
			);
			if (username) {
				delete gameState.votes[username];
				console.log("user disconnected", username, ", gameState", gameState);
				io.emit("userDisconnected", { username });
				emitGameState();
			}
			console.log("user disconnected");
		});

	};

	// Define actions inside
	io.on("connection", onConnection);

	io.on("disconnect", (socket) => {
		const username = Object.keys(gameState.votes).find(
			(username) => gameState.votes[username].id === socket.id
		);
		if (username) {
			delete gameState.votes[username];
			console.log("user disconnected", username, ", gameState", gameState);
			io.emit("userDisconnected", { username });
			emitGameState();
		}
		console.log("user disconnected");
	});

	console.log("Setting up socket");
	res.end();
}
