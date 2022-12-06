import { ICONS, randomAnimal } from "../../assets/icons";
import { UsersDataEvent } from "../../interfaces/interfaces";

interface Props {
	users: string[];
	usersData: UsersDataEvent;
	isRevealed: boolean;
}

export default function UsersList({ users, usersData, isRevealed }: Props){
	return (
		<div className="">
			<h1 className="text-2xl font-bold divide-x-2 divide-solid divide-black">
				Users Votes
			</h1>
			<table className="w-full text-left">
				<thead>
					<tr>
						<th className="py-2">Username</th>
						<th className="py-2">Vote</th>
					</tr>
				</thead>
				<tbody>
					{users?.filter(user => user !== '').map((user) => (
						<tr key={user}>
							<td className="border border-white py-2">{user}</td>
							<td className="border border-white py-2">
								{usersData[user]?.vote
									? isRevealed
										? usersData[user]?.vote
										: <ICONS.hide className="inline-block text-red-600" />
									: <ICONS.pending className="inline-block text-yellow-600" />}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
