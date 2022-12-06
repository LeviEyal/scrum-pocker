import io, { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { useStore } from "../store/store";
import { useRouter } from "next/router";
import { randomAnimal } from "../assets/icons";

export default function Home() {
	const { socket, login, username } = useStore();
	const [usernameTemp, setUsernameTemp] = useState("");
	const { push } = useRouter();

	useEffect(() => {
		if (username) {
			push("/scrum");
		}
	}, [username]);

	const handleLogin = () => {
		const usernameDisplay = `${usernameTemp}  ${randomAnimal()}`;
		socket.emit("userConnected", { username: usernameDisplay });
		login(usernameDisplay);
		push("/scrum");
	};

	return (
		<div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-400">
			<main className="gap-4 flex flex-col items-center justify-center w-full h-full">
				<h3 className="font-bold text-white text-xl">
					How people should call you?
				</h3>
				<input
					type="text"
					placeholder="Identity..."
					value={usernameTemp}
					className="p-3 rounded-md outline-none"
					onChange={(e) => setUsernameTemp(e.target.value)}
				/>
				<button
					onClick={handleLogin}
					className="bg-white rounded-md px-4 py-2 text-xl"
				>
					Go!
				</button>
			</main>
		</div>
	);
}
