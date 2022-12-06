import { useEffect, useState } from "react";
import { ClientToServerEvents, UsersDataEvent } from "../interfaces/interfaces";
import { useStore } from "../store/store";

export default function useScrumFlow() {
	const { socket, username } = useStore();
	const [vote, setVote] = useState("");
	const [isRevealed, setIsRevealed] = useState(false);
	const [usersData, setUsersData] = useState<UsersDataEvent>({});

	const users: string[] = Object.keys(usersData);

	const currentUserVote = usersData[username]?.vote;

	useEffect(() => {
		if (socket) {
			socket.on("userRevealed", (data) => {
				setIsRevealed(true);
			});
			socket.on("userUnrevealed", (data) => {
				setIsRevealed(false);
			});
			socket.on("usersData", (data) => {
				console.log("usersData", data);
				setUsersData(data);
			});
		}

		return () => {
			if (socket) {
				socket.off("userRevealed");
				socket.off("userUnrevealed");
				socket.off("usersData");
			}
		};
	}, [socket, username]);

	const handleVote = (value: string) => {
		// setVote(value);
		socket.emit("userVoted", { username, vote: value });
	};

	const handleReveal = () => {
		socket.emit("userRevealed", { username });
	};

	const handleUnreveal = () => {
		socket.emit("userUnrevealed", { username });
	};

	const handleReset = () => {
		socket.emit("userReset", { username });
	};

	return {
		vote,
		usersData,
		isRevealed,
		handleVote,
		handleReveal,
		handleUnreveal,
		handleReset,
		users,
		currentUserVote
	};
}
