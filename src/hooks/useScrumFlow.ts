import { useEffect, useState } from "react";
import { ClientToServerEvents, GameState } from "../interfaces/interfaces";
import { useStore } from "../store/store";
import { useTimeWatch } from "./useTimeWatch";

/**
 * Custom hook for managing the Scrum Flow.
 * Manages the state of the Scrum Flow, including user votes, game state, and time tracking.
 * Provides functions for handling user votes, starting and stopping voting sessions, and accessing the current state.
 *
 * @returns An object containing the following properties and functions:
 * - votes: An object representing the votes of all users.
 * - isRevealed: A boolean indicating whether the votes have been revealed.
 * - handleVote: A function for handling user votes.
 * - users: An array of usernames of all users who have voted.
 * - currentUserVote: The current user's vote.
 * - resetTimewatch: A function for resetting the time tracking.
 * - startTimewatch: A function for starting the time tracking.
 * - formatedTime: The formatted time tracked.
 * - startVotingSession: A function for starting a voting session.
 * - stopVotingSession: A function for stopping a voting session.
 */
export default function useScrumFlow() {
	const { socket, username } = useStore();
	const { resetTimewatch, startTimewatch, formatedTime } = useTimeWatch();

	const [currentUserVote, setCurrentUserVote] = useState<string>("0");
	const [gameState, setGameState] = useState<GameState>({
		votes: {},
		revealed: false,
	});

	const isRevealed = gameState.revealed;
	const votes = gameState?.votes;

	const users: string[] = Object.keys(gameState?.votes);

	useEffect(() => {
		if (socket) {
			socket.emit("userConnected", { username });
			socket.on("gameState", (data) => {
				console.log("gameState", data);
				setGameState(data);
			});
			socket.on("sessionStarted", () => {
				startTimewatch();
				setCurrentUserVote("");
			});
			socket.on("sessionStoped", () => {
				resetTimewatch();
			});
		}

		return () => {
			if (socket) {
				socket.off("gameState");
				socket.off("sessionStarted");
				socket.off("sessionStoped");
			}
		};
	}, [socket, username]);

	const handleVote = (value: string) => {
		setCurrentUserVote(value);
		socket.emit("applyVote", { username, vote: value });
	};

	const startVotingSession = () => {
		socket.emit("startVotingSession");
	};

	const stopVotingSession = () => {
		socket.emit("stopVotingSession");
	};

	return {
		votes,
		isRevealed,
		handleVote,
		users,
		currentUserVote,
		resetTimewatch,
		startTimewatch,
		formatedTime,
		startVotingSession,
		stopVotingSession,
	};
}
