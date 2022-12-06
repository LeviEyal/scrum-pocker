export interface UserRevealEvent {
	username: string;
}

export interface UserResetEvent {
	username: string;
}

export interface UserConnectedEvent {
	username: string;
}

export interface UserDisconnectedEvent {
	username: string;
}

export interface UserVotedEvent {
	username: string;
	vote: string;
}

export interface UserUnvotedEvent {
	username: string;
}

export interface UsersDataEvent {
	[username: string]: {
		username: string;
		vote: string;
	};
}

export interface ClientToServerEvents {
	userConnected: (data: UserConnectedEvent) => void;
	userDisconnected: (data: UserDisconnectedEvent) => void;
	userVoted: (data: UserVotedEvent) => void;
	userUnvoted: (data: UserUnvotedEvent) => void;
	userRevealed: (data: UserRevealEvent) => void;
	userUnrevealed: (data: UserRevealEvent) => void;
	userReset: (data: UserResetEvent) => void;
	usersData: (data: UsersDataEvent) => void;
}

export interface ServerToClientEvents {
	userConnected: (data: UserConnectedEvent) => void;
	userDisconnected: (data: UserDisconnectedEvent) => void;
	userVoted: (data: UserVotedEvent) => void;
	userUnvoted: (data: UserUnvotedEvent) => void;
	userRevealed: (data: UserRevealEvent) => void;
	userUnrevealed: (data: UserRevealEvent) => void;
	userReset: (data: UserResetEvent) => void;
	usersData: (data: UsersDataEvent) => void;
}
