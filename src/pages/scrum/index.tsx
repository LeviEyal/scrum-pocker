import Router from "next/router";
import { useEffect } from "react";
import { useStore } from "../../store/store";
import { UsersList } from "./UsersList";
import { useScrumFlow } from "./useScrumFlow";

const HEADERS = ["How much known for the task", "Dependencies", "Work effort", "Story points", ""];
const ROWS = [
  ["Everything", "No dependencies", "Less than 2 hours", "1"],
  ["Almost Everything", "Almost None", "Half a day", "2"],
  ["Mostly Everything", "Some", "1-2 days", "3"],
  ["Almost Nothing", "Few", "Few days", "5"],
  ["Nothing", "Many", "Around a week", "8"],
  ["Nothing", "Too many", "More than a week", "13"],
];

export default () => {
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
	} = useScrumFlow();

	useEffect(() => {
		if (!username) {
			Router.push("/");
		}
	}, [username]);

	return (
		<div className="flex flex-col items-center justify-center h-full min-h-screen bg-purple-400">
			<h1 className="text-4xl font-bold">Scrum Poker</h1>
			<div className="flex items-center justify-center">
				<button className="p-2 border rounded" onClick={handleReset}>
					Reset Votes
				</button>
				<button
					className="p-2 border rounded"
					onClick={isRevealed ? handleUnreveal : handleReveal}
				>
					{isRevealed ? "Unreveal" : "Reveal"}
				</button>
			</div>
			<div className="grid grid-cols-[1fr_3fr] gap-10 w-full h-full p-12">
				<section className="grow row-span-1 bg-white text-black rounded-lg p-5 shadow-xl">
					<UsersList
						users={users}
						usersData={usersData}
						isRevealed={isRevealed}
					/>
				</section>


				<section className="row-span-2 bg-white text-black rounded-lg p-5 shadow-xl">
					<table>
						<thead>
							<tr>
								{HEADERS.map((header) => (
									<th key={header} className="px-4 py-2">
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
										<button
											className="bg-white text-purple-400 px-4 py-2 rounded"
											onClick={() => handleVote(row[row.length-1])}
										>
											Vote
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
        </section>
			</div>
		</div>
	);
};
