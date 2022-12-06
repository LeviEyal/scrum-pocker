import io, { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

export default function Home() {
	const { socket, login } = useStore();
	const [username, setUsername] = useState("");
	const { push } = useRouter();

	const handleLogin = () => {
		socket.emit("userConnected", { username });
		login(username);
		push("/scrum");
	};

	return (
		<div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
			<main className="gap-4 flex flex-col items-center justify-center w-full h-full">
				<h3 className="font-bold text-white text-xl">
					How people should call you?
				</h3>
				<input
					type="text"
					placeholder="Identity..."
					value={username}
					className="p-3 rounded-md outline-none"
					onChange={(e) => setUsername(e.target.value)}
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
