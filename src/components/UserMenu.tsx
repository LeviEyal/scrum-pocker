import { useStore } from "../store/store";
import { useState } from "react";
import { ICONS } from "../assets/icons";

export const UserMenu = () => {
	const { username, socket, logout } = useStore();
	const [isOpen, setIsOpen] = useState(false);

	const handleMenuClick = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = () => {
		logout();
		socket.emit("userDisconnected", { username });
	};

	return (
		<div
			className="flex justify-center items-center bg-gray-300 rounded p-2 px-4 hover:cursor-pointer"
			onClick={handleMenuClick}
		>
			<ICONS.user className="inline-block mr-2" />
			{username}
			<div className="relative top">
				{isOpen && (
					<div className="absolute right-10 top-10 bg-gray-100 rounded p-2 px-4">
						<button onClick={handleLogout}>Logout</button>
					</div>
				)}
			</div>
		</div>
	);
};
