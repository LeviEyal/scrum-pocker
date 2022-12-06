import Router from "next/router";
import { useEffect } from "react";
import { useStore } from "../../store/store";
import UsersList from "./UsersList";
import useScrumFlow from "../../hooks/useScrumFlow";
import { AppHeader } from "../../components/AppHeader";
import { ICONS } from "../../assets/icons";

const HEADERS = [
	"How much known for the task",
	"Dependencies",
	"Work effort",
	"Story points",
	"",
];
const ROWS = [
	["Everything", "No dependencies", "Less than 2 hours", "1"],
	["Almost Everything", "Almost None", "Half a day", "2"],
	["Mostly Everything", "Some", "1-2 days", "3"],
	["Almost Nothing", "Few", "Few days", "5"],
	["Nothing", "Many", "Around a week", "8"],
	["Nothing", "Too many", "More than a week", "13"],
];

export default function Main() {
	const { socket, login, username } = useStore();
	const {
		handleVote,
		vote,
		handleReset,
		handleReveal,
		handleUnreveal,
		isRevealed,
		usersData,
		users,
		currentUserVote,
	} = useScrumFlow();

	useEffect(() => {
		console.log({ username });
		if (!username) {
			Router.push("/");
		}
	}, [username]);

	return (
		<div className="flex flex-col h-full min-h-screen text-2xl">
			<AppHeader />
			<div className="z-0 flex flex-col items-center justify-center grow bg-purple-50">
				<h1 className="text-4xl font-bold">
					Scrum Poker - SeeTrue SW Iteration Planning
				</h1>
				<div className="flex items-center justify-center mt-5 space-x-5">
					<button
						className="flex items-center space-x-3 p-2 border rounded text-white bg-red-800 hover:bg-red-500 "
						onClick={handleReset}
					>
						<ICONS.reset className="inline-block w-6 h-6" />
						<h1>Reset Votes</h1>
					</button>
					<button
						className="flex items-center space-x-3 p-2 border rounded text-white bg-purple-800 hover:bg-purple-500"
						onClick={isRevealed ? handleUnreveal : handleReveal}
					>
						{!isRevealed ? (
							<ICONS.eyeOpen className="inline-block w-6 h-6" />
						) : (
							<ICONS.eyeClosed className="inline-block w-6 h-6" />
						)}
						<h1>{isRevealed ? "Hide Votes" : "Reveal Votes"}</h1>
					</button>
				</div>
				<div className="grid grid-cols-[3fr_1fr] gap-10 w-full h-full py-5 px-12">
					<section className="row-span-2 bg-white text-black text-left rounded-lg p-5 shadow-xl">
						<table className="w-full">
							<thead>
								<tr>
									{HEADERS.map((header) => (
										<th key={header} className="py-2 px-4 text-xl border-b-2">
											{header}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{ROWS.map((row, idx) => (
									<tr key={idx}>
										{row.map((cell) => (
											<td key={cell} className="border border-white px-4 py-2">
												{cell}
											</td>
										))}
										<td className="border border-white px-4 py-2">
											{currentUserVote === row[row.length - 1] ? (
												<button
													className="flex items-center space-x-3 p-2 border rounded text-white bg-purple-800 hover:bg-purple-500"
													onClick={() => handleVote("")}
												>
													<ICONS.checkboxChecked className="inline-block w-6 h-6" />
													<h1>Unvote</h1>
												</button>
											) : (
												<button
													className="flex items-center space-x-3 bg-white text-purple-400 px-4 py-2 rounded border border-purple-400 hover:bg-purple-400 hover:text-white"
													onClick={() => handleVote(row[row.length - 1])}
												>
													<ICONS.checkboxUnchecked className="inline-block w-6 h-6" />
													<h1>vote</h1>
												</button>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
												
					<section className="grow row-span-1 bg-white text-black rounded-lg p-5 shadow-xl">
						<UsersList
							users={users}
							usersData={usersData}
							isRevealed={isRevealed}
						/>
					</section>
				</div>
			</div>
		</div>
	);
}
