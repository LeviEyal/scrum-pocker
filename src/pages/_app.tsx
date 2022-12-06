import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../interfaces/interfaces";

function MyApp({ Component, pageProps }: AppProps) {
	const { setSocket, socket } = useStore();

	useEffect(() => {
		socketInitializer();
	}, []);

	const socketInitializer = async () => {
		await fetch("/api/socket");
		if (socket) return;
		const sock = io();
    setSocket(sock);
	};

	return (
		<>
			<Head>
				<title>Scrum Poker - SeeTrue SW Iteration Planning</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<style> @import url('https://fonts.googleapis.com/css2?family=Jost&family=Montserrat+Alternates:wght@400;600&family=Poppins:wght@200;600;700&family=Quicksand&display=swap'); </style>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
