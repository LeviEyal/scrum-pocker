import Router from "next/router";
import { useEffect } from "react";
import { useStore } from "../../store/store";
import UsersList from "./UsersList";
import useScrumFlow from "../../hooks/useScrumFlow";

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
    currentUserVote
	} = useScrumFlow();

	useEffect(() => {
		if (!username) {
			Router.push("/");
		}
	}, [username]);

	return (
		<div className="flex flex-col items-center justify-center h-full min-h-screen bg-purple-200">
			<h1 className="text-4xl font-bold">
				Scrum Poker - SeeTrue SW Iteration Planning
			</h1>
			<div className="flex items-center justify-center mt-5">
				<button className="p-2 border rounded text-white bg-purple-800 hover:bg-purple-500" onClick={handleReset}>
					Reset Votes
				</button>
				<button
					className="p-2 border rounded text-white bg-purple-800 hover:bg-purple-500"
					onClick={isRevealed ? handleUnreveal : handleReveal}
				>
					{isRevealed ? "Unreveal" : "Reveal"}
				</button>
			</div>
			<div className="grid grid-cols-[1fr_3fr] gap-10 w-full h-full py-5 px-12">
				<section className="grow row-span-1 bg-white text-black rounded-lg p-5 shadow-xl">
					<UsersList
						users={users}
						usersData={usersData}
						isRevealed={isRevealed}
					/>
				</section>

				<section className="row-span-2 bg-white text-black text-left rounded-lg p-5 shadow-xl">
					<table className="w-full">
						<thead>
							<tr>
								{HEADERS.map((header) => (
									<th key={header} className="py-2 px-4 text-xl">
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
                    {
                      currentUserVote === row[row.length - 1] ? (
                        <button
                          className="p-2 border rounded text-white bg-purple-800 hover:bg-purple-500"
                          onClick={() => handleVote("")}
                        >
                          Unvote
                        </button>
                      ) : (
										<button
											className="bg-white text-purple-400 px-4 py-2 rounded border border-purple-400 hover:bg-purple-400 hover:text-white"
											onClick={() => handleVote(row[row.length - 1])}
										>
											Vote
                        </button>
                      )
                    }
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
			</div>
		</div>
	);
}
