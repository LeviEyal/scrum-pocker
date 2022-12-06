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
				<title>NextJS TailwindCSS TypeScript Starter</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
