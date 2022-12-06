import { UsersDataEvent } from "../../interfaces/interfaces";

interface Props {
	users: string[];
	usersData: UsersDataEvent;
	isRevealed: boolean;
}

export default function UsersList({ users, usersData, isRevealed }: Props){
	return (
		<div className="">
			<h1 className="text-4xl font-bold divide-x-2 divide-solid divide-black">
				Users Votes
			</h1>
			<table>
				<thead>
					<tr>
						<th className="px-4 py-2">Username</th>
						<th className="px-4 py-2">Vote</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user}>
							<td className="border border-white px-4 py-2">{user}</td>
							<td className="border border-white px-4 py-2">
								{usersData[user]?.vote
									? isRevealed
										? usersData[user]?.vote
										: "Not revealed"
									: "Not voted"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
