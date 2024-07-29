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

export interface GameState {
	votes: {
		[username: string]: {
			username: string;
			vote: string;
			id: string;
		};
	};
	revealed: boolean;
}

export interface ClientToServerEvents {
	userConnected: (data: UserConnectedEvent) => void;
	userDisconnected: (data: UserDisconnectedEvent) => void;
	applyVote: (data: UserVotedEvent) => void;
	startVotingSession: () => void;
	stopVotingSession: () => void;
}

export interface ServerToClientEvents {
	userConnected: (data: UserConnectedEvent) => void;
	userDisconnected: (data: UserDisconnectedEvent) => void;
	userVoted: (data: UserVotedEvent) => void;
	userRevealed: (data: UserRevealEvent) => void;
	userUnrevealed: (data: UserRevealEvent) => void;
	gameState: (data: GameState) => void;
	sessionStarted: () => void;
	sessionStoped: () => void;
}
